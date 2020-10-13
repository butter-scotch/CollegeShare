import React, {useCallback} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {makeStyles} from '@material-ui/styles'
import '../../assets/section.css'
import '../../assets/text.css'
import { db } from '../../firebase'
import { useSelector } from 'react-redux'
import {getUserId} from '../../reducks/users/selectors'

const useStyles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto',
    '&:hover': {
      opacity: 0.7
    }
  },
  image: {
    objectFit: 'cover',
    // 画像からはみ出た部分をトリミングする
    margin: '8px 16px 8px 0',
    height: 96,
    width: 96
  },
  text: {
    // width: 96
    margin: "0 0 0 30px",
  },
  iconcell: {
    margin: "0 0 0 auto"
  }
})




const FavoriteItemCard = (props) => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)

  const product = props.product
  console.log(product)

  const removeProductFromFavorite = (id) => {
    return db.collection('users').doc(uid).collection('favorite').doc(id).delete()
  }

  return(
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img 
            className={classes.image}
            src={product.images[0].path}
            alt={"Ordered Product"}
          />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText 
            primary={product.name}
          />
        </div>
        <IconButton className={classes.iconcell} onClick={() => removeProductFromFavorite(product.favoriteId)} >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )

}

export default FavoriteItemCard