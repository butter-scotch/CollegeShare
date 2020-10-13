import React, {useCallback} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/styles'
import {FavoriteItemCard} from './index'
import '../../assets/section.css'
import '../../assets/text.css'
import '../../assets/spacer.css'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsInFavorite, getSchoolId, getUserId } from '../../reducks/users/selectors'
import { PrimaryButton } from '../UIkit'
import { push } from 'connected-react-router'


const useStyles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto'
  },
  headline: {
    fontSize: "1.6rem",
    fontWeight: "600",
    color: "#333",
    margin: "0 auto",
    letterSpacing: "0.1em"
  },
})

const FavoriteListItem = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)
  // const productsInFavorite =  getProductsInFavorite(selector)

  const productsInFavorite = props.productsInFavorite

  console.log(productsInFavorite)
  console.log(selector)

  const backToHome = useCallback(() => {
    dispatch(push('/' + sid + '/' + uid ))
  }, [])

  return(
    <>
    <List>
        <ListItem className={classes.list}>
          <h2 className={classes.headline}>いいね！一覧</h2>
        </ListItem>
        <Divider />
        {productsInFavorite && (
          productsInFavorite.map(product => <FavoriteItemCard product={product} key={product.favoriteId} />)
        )}
      </List>
      <div className="module-spacer--small" />
      <PrimaryButton label={"ショッピングを続ける"} onClick={backToHome} />
    </>
  )

}

export default FavoriteListItem