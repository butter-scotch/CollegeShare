import React, {useCallback, useState, useEffect} from 'react'
import HTMLReactParser from "html-react-parser"
import {ImageSwiper, DetailTable} from '../components/Products/index'
import { makeStyles } from '@material-ui/core/styles'
import {PrimaryButton, RedButton} from '../components/UIkit/index'
import '../assets/section.css'
import '../assets/spacer.css'
import { useSelector, useDispatch } from 'react-redux'
import { getSchoolId, getUserId } from '../reducks/users/selectors'
import { db } from '../firebase/index'
import {push} from 'connected-react-router'


const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 450
    }
  },
}))

const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}

const ProductDetail = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const selector = useSelector((state) => state)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)
  const path = selector.router.location.pathname
  const id = path.split('/')[4]

  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('schools').doc(sid).collection('products').doc(id).get()
      .then(doc => {
        const data = doc.data()
        setProduct(data)
      })
  }, [])

  // console.log(product)
  console.log(id)
  console.log(path)

  console.log(product)




  return(
    <section className="c-section-wrapin">
      {product && (
        <>
          <div className="p-grid__row">
            <div className={classes.sliderBox}>
              <ImageSwiper images={product.images} />
            </div>
            <div className={classes.detail}>
              <DetailTable 
                name={product.name} category={product.category} gender={product.gender} 
                price={product.price} seller={product.seller}
              />
              <div className={"module-spacer--small"} />
              <div className={"center"}>
                <RedButton 
                  label={"購入画面に進む"} 
                  onClick={() => dispatch(push('/' + sid + '/' + uid + '/' + id + '/order/confirm'))}
                />
              </div>
            </div>
          </div>
          <div className="module-spacer--small" />
          <p className={classes.detail}>{returnCodeToBr(product.description)}</p>
        </>
      )}
    </section>
  )

}

export default ProductDetail