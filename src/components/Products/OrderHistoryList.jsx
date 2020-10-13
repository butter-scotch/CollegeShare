import React, {useCallback} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import {makeStyles} from '@material-ui/styles'
import {OrderHistoryItemCard} from './index'
import '../../assets/section.css'
import '../../assets/text.css'


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

const OrderHistoryList = (props) => {
  const classes = useStyles()
  const orders = props.orders

  return(
    <List>
      <ListItem className={classes.list}>
        <h2 className={classes.headline}>取引履歴</h2>
      </ListItem>
      <Divider />
      {orders && (
        orders.map(order => <OrderHistoryItemCard order={order} key={order.orderid} />)
      )}
    </List>
  )

}

export default OrderHistoryList