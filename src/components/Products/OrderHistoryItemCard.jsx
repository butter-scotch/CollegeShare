import React, {useCallback} from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import avatar from '../../assets/img/USBB9381.PNG'
import '../../assets/section.css'
import '../../assets/text.css'

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
    margin: "0 0 0 auto",
  }
})

const OrderHistoryItemCard = (props) => {
  const classes = useStyles()

  const order = props.order
  const name = order.product[0].name
  const image = order.product[0].images[0].path

  console.log(order)
  console.log(name)

  return(
    <>
      <ListItem className={classes.list}>
        <ListItemAvatar>
          <img 
            className={classes.image}
            src={image}
            alt={"Ordered Product"}
          />
        </ListItemAvatar>
        <div className={classes.text}>
          <ListItemText 
            primary={name + " を購入しました。"}
          />
        </div>
        <IconButton className={classes.iconcell}>
          <ArrowForwardIosIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )

}

export default OrderHistoryItemCard