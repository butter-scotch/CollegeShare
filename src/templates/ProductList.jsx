import React, {useCallback, useEffect} from 'react'
import '../assets/section.css'
import {ProductCard} from '../components/Products/index'
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import {fetchProducts} from '../reducks/schools/operations'
import {push} from "connected-react-router"
import { getProducts } from '../reducks/schools/selectors'
import {getSchoolId, getUserId, getProductsInFavorite} from '../reducks/users/selectors'


const useStyles = makeStyles((theme) => ({
  addCircle: {
    color: "#F50158",
    position: "fixed",
    top: "80%",
    right: "5%",
    margin: "16px",
    transform: "translateY(-50%)",
    '&:hover': {
      opacity: 0.8,
      cursor: "pointer"
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: 150,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 100,
    }
  }
}))

const ProductList = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const products = getProducts(selector)
  const schoolid = getSchoolId(selector)
  const uid = getUserId(selector)

  const query = selector.router.location.search
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : ""
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ""

  useEffect(() => {
    dispatch(fetchProducts(gender, category))
  }, [query])

  console.log(products)



  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 && (
          products.map(product => (
            <ProductCard 
              key={product.id} id={product.id} name={product.name}
              images={product.images} price={product.price} product={product}
            />
          ))
        )}
      </div>
      <AddCircleOutlineSharpIcon 
        className={classes.addCircle} 
        onClick={() => dispatch(push('/' + schoolid + '/' + uid + '/product/edit'))}
      />
    </section>
  )
}

export default ProductList