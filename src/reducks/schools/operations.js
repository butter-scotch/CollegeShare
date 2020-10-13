import { FirebaseTimestamp, db } from "../../firebase"
import { push } from "connected-react-router"
import {deleteProductAction, fetchProductsAction} from "./actions"

const schoolsRef = db.collection('schools')


export const fetchProducts = (gender, category) => {
  return async(dispatch, getState) => {
    const sid = getState().users.sid
    
    let query = schoolsRef.doc(sid).collection('products').orderBy('updated_at', 'desc')
    query = (gender !== "") ? query.where('gender', '==', gender) : query
    query = (category !== "") ? query.where('category', '==', category) : query

    query.get()
      .then(snapshots => {
        const productList = []
        snapshots.forEach(snapshot => {
          const product = snapshot.data()
          productList.push(product)
        })
        dispatch(fetchProductsAction(productList))
      })
  }
}

export const orderProduct = (orderProduct, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid
    const sid = getState().users.sid
    const timestamp = FirebaseTimestamp.now()
    
    const sellerid = orderProduct.seller.uid
    const sellid = orderProduct.sellid


    let product = []

    const batch = db.batch()

    console.log(getState())
    console.log(sellerid)
    console.log(sellid)
    
    product.push({
      id: orderProduct.id,
      images: orderProduct.images,
      name: orderProduct.name,
      price: orderProduct.price,
      seller: orderProduct.seller
    })
    
    console.log(orderProduct.id)

  


    batch.delete(
      schoolsRef.doc(sid).collection('products').doc(orderProduct.id)
    )

    // batch.delete(
    //   db.collection('users').doc(sellerid).collection('sells').doc(sellid)
    // )

    if (orderProduct.id = null) {
      alert('大変申し訳ありません。' + orderProduct.name + 'が他の方に購入されたため、注文処理を中断しました。')
      return false
    } else {
      batch.commit()
        .then(() => {
          const orderRef = db.collection('users').doc(uid).collection('orders').doc()

          const orderHistory = {
            amount: amount,
            created_at: timestamp,
            orderid: orderRef.id,
            product: product,
            updated_at: timestamp
          }

          orderRef.set(orderHistory)

          const soldRef = db.collection('users').doc(sellerid).collection('solds').doc()
          // const soldid = soldRef.id
          // orderProduct.soldid = soldid

          // console.log(soldid)

          // db.collection('users').doc(sellerid).collection('solds').doc(soldid).set(history)
          //   .then(() => {
          //     dispatch(push('/' + sid + '/' + uid + '/order/complete'))
          //   }).catch(() => {
          //     alert('い')
          //     return false
          //   })

          
          const soldHistory = {
            amount: amount,
            created_at: timestamp,
            soldid: soldRef.id,
            product: product,
            updated_at: timestamp
          }
          
          soldRef.set(soldHistory)
          
          db.collection('users').doc(sellerid).collection('sells').doc(sellid).delete()

          dispatch(push('/' + sid + '/' + uid + '/order/complete'))


        }).catch(() => {
          alert('注文処理に失敗しました。通信環境をご確認の上もう一度お試しください。')
          return false
        })
    }


  }
}


export const saveProduct = (sellid, id, name, description, images, price, category, gender, size, seller) => {
  return async(dispatch, getState) => {
    const uid = getState().users.uid
    const sid = getState().users.sid
    const timestamp = FirebaseTimestamp.now()
    // const seller = []

    // db.collection('users').doc(uid).get()
    //   .then(snapshot => {
    //     const data = snapshot.data()

    //     const sellername = data.username
    //     const sellericon = data.icon
    //     const sellerid = data.uid

    //     const information = {name: sellername, icon: sellericon, id: sellerid}

    //     seller.push(information)
    //   })

    const data = {
      name: name,
      description: description,
      images: images,
      price: parseInt(price, 10),
      category: category,
      gender: gender,
      size: size,
      updated_at: timestamp,
      seller: seller
    }


    console.log(data)


    if (id === "") {
      const ref = db.collection('products').doc()
      id =ref.id
      data.id = id
      data.created_at = timestamp
    }

    if (sellid === "") {
      const sellRef = db.collection('users').doc(uid).collection('sells').doc()
      sellid = sellRef.id
      data.sellid = sellid
    }
    
    return db.collection('schools').doc(sid).collection('products').doc(id).set(data, {merge: true})
    .then(() => {

        console.log(sellid)

        db.collection('users').doc(uid).collection('sells').doc(sellid).set(data, {merge: true})
          .then(() => {
            dispatch(push('/' + sid + '/' + uid))
          }).catch((error) => {
            alert('あ')
            throw new Error(error)
          })

      }).catch((error) => {
        alert('い')
        throw new Error(error)
      })
  }
}

export const saveSchools = (schoolname ,sid) => {
  return async(dispatch, getState) => {
    const uid = getState().users.uid
    const timestamp = FirebaseTimestamp.now()

    const info = {
      schoolname: schoolname,
      sid: sid
    }

    info.created_at = timestamp

    return db.collection('schools').doc(sid).set(info)
      .then(() => {
        dispatch(push('/' + sid + '/' + uid))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}