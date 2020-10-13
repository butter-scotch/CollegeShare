import React from 'react'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import {makeStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import { useSelector, useDispatch } from 'react-redux'
import {getUserId, getSchoolId} from "../../reducks/users/selectors"
import {db} from '../../firebase/index'
import {push} from 'connected-react-router'
import {removeProductFromSell} from '../../reducks/users/operations'


const useStyles = makeStyles({
  list: {
    height: 128
  },
  image: {
    objectFit: 'cover',
    margin: 16,
    height: 96,
    width: 96
  },
  text: {
    width: '100%'
  }
})

const SellListItem = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const sid = getSchoolId(selector)

  const name = props.product.name
  const image = props.product.images[0].path
  const price = props.product.price.toLocaleString()
  const size = props.product.size
  const sellid = props.product.sellid
  const id = props.product.id

  console.log(sellid)
  console.log(id)

  // const removeProductFromSell = (sellid) => {
  //   return db.collection('users').doc(uid)
  //           .collection('sells').doc(sellid)
  //           .delete()
  // }
  
  return(
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar onClick={() => dispatch(push('/' + sid + '/' + uid + '/product/edit/' + props.product.sellid))}>
          <img className={classes.image} src={image} alt="商品画像"/>
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText 
            primary={name}
            secondary={"サイズ：" + size}
            // primaryとsecondaryでメインとサブのテキストを作ることができる
          />
          <ListItemText 
            primary={"¥" + price}
          />
        </div>
        <IconButton onClick={() => dispatch(removeProductFromSell(sellid, id))} >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )

}

export default SellListItem