import React from 'react';
import List from '@material-ui/core/List'
import { makeStyles } from '@material-ui/styles'
import { useSelector, useDispatch } from 'react-redux';
import { getSells } from '../reducks/users/selectors';
import { useEffect } from 'react';
import {fetchSells} from '../reducks/users/operations'
import {SellListItem} from '../components/Products/index'
import '../assets/section.css'
import '../assets/text.css'

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const SellList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const productsInSells = getSells(selector)

  useEffect(() => {
    dispatch(fetchSells())
  }, [])

  console.log(productsInSells)

  return(
    <section className="c-section-wrapin-white">
      <h2 className="u-text__headline">
        出品中の商品
      </h2>
      <List className={classes.root}>
        {productsInSells.length > 0 && (
          productsInSells.map(product => <SellListItem key={product.id} product={product} />)
        )}
      </List>
      
    </section>
  )
}

export default SellList