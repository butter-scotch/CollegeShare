import React, {useCallback} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import {makeStyles} from '@material-ui/styles'
import avatar from '../../assets/img/USBB9381.PNG'
import '../../assets/section.css'
import '../../assets/text.css'

const useStyles = makeStyles({
  list: {
    background: '#fff',
    height: 'auto',
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
}, [])

const OrderItemCard = (props) => {
  const classes = useStyles()

  const product = props.product

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
      </ListItem>
      <Divider />
    </>
  )

}

export default OrderItemCard