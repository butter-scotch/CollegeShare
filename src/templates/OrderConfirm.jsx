import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from "@material-ui/core/Divider"
import {RedButton, TextDetail} from '../components/UIkit/index'
import {OrderItemCard} from '../components/Products/index'
import { db } from '../firebase/index'
import { useSelector, useDispatch } from 'react-redux'
import { getSchoolId, getUserId } from '../reducks/users/selectors'
import '../assets/section.css'
import '../assets/spacer.css'
import { orderProduct } from '../reducks/schools/operations'


const useStyles = makeStyles((theme) => ({
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 200,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288,
  },
  headline: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#333",
    margin: "0 auto",
    padding: "30px 0",
    letterSpacing: "0.1em"
  },
  item: {
    [theme.breakpoints.up('sm')]: {
      margin: "0 15%"
    }
  }
}))

const OrderConfirm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const sid = getSchoolId(selector)
  const id = path.split('/')[3]

  console.log(id)

  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('schools').doc(sid).collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
      })
  }, [])

  console.log(product)


  return(
    <section className="c-section-wrapin-white">
      {product && (
        <>
          <h2 className={classes.headline}>購入内容の確認</h2>
          <div className={classes.item}>
            <Divider />
            <OrderItemCard product={product}/>
            <Divider />
          </div>
          <div className={classes.orderBox}>
            <TextDetail 
              label={"商品合計"} 
              value={"¥" + product.price.toLocaleString()} 
            />
            <TextDetail 
              label={"消費税"} 
              value={"¥" + Math.ceil(product.price * 0.1).toLocaleString()} 
              // Math.ceilで小数点を切り上げしている
            />
            <Divider />
            <div className="module-spacer--small" />
            <TextDetail 
              label={"合計（税込）"} 
              value={"¥" + (product.price + Math.ceil(product.price * 0.1)).toLocaleString()} 
            />
          </div>
          <div className="module-spacer--small" />
          <RedButton 
            label={"購入する"} 
            onClick={() =>dispatch(orderProduct(product, Math.ceil((product.price + product.price * 0.1).toLocaleString())))}
          />
          <div className="module-spacer--small" />
        </>
      )}
    </section>
  )

}

export default OrderConfirm