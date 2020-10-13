import React from 'react'
import {OrderHistoryList} from '../components/Products/index'
import '../assets/section.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderHistory } from '../reducks/users/operations'
import { getOrdersHistory } from '../reducks/users/selectors'

const OrderHistory = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const orders = getOrdersHistory(selector)

  useEffect(() => {
    dispatch(fetchOrderHistory())
  }, [])

  console.log(orders)


  return(
    <section className={"c-section-wrapin"}>
      <OrderHistoryList orders={orders}/> 
    </section>
  )

}

export default OrderHistory