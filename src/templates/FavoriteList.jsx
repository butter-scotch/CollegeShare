import React, {useCallback} from 'react'
import {FavoriteListItem} from '../components/Products/index'
import '../assets/section.css'
import {getProductsInFavorite} from '../reducks/users/selectors'
import { useSelector } from 'react-redux'

const FavoriteList = () => {
  const selector = useSelector((state) => state)

  const productsInFavorite =  getProductsInFavorite(selector)


  return(
    <section className={"c-section-wrapin"}>
      <FavoriteListItem productsInFavorite={productsInFavorite} />
    </section>
  )

}

export default FavoriteList