import React, {useState, useEffect, useCallback} from 'react'
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from "@material-ui/icons/Menu"
import FaceIcon from '@material-ui/icons/Face';
import {TextInput} from '../UIkit/index'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { push } from "connected-react-router"
import {getProductsInFavorite, getSchoolId, getUserId } from '../../reducks/users/selectors'
import { fetchProductsInFavorite } from '../../reducks/users/operations'
import {db} from '../../firebase/index'

const useStyles = makeStyles((theme) => ({
  searchField: {
    [theme.breakpoints.down('sm')]: {
      display: "none"
    },
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      display: 'flex',
      margin: '5px 0 0 5px'
    },
  },
  flex: {
    display: 'flex'
  }
}))

const HeaderMenus = (props) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)

  let productsInFavorite = getProductsInFavorite(selector)

  const [keyword, setKeyword] = useState('')

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  }, [setKeyword])

  console.log(productsInFavorite)
  console.log(keyword)

  



  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('favorite')
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data()
          const changeType = change.type


          switch(changeType){
            case 'added':
              productsInFavorite.push(product)
              break
            case 'modified':
              const index = productsInFavorite.findIndex(product => product.favoriteId === change.doc.id)
              // fineindexは配列を一個一個調べて何番目が変化したか調べる
              productsInFavorite[index] = product
              break
            case 'removed':
              productsInFavorite = productsInFavorite.filter(product => product.favoriteId !== change.doc.id)
              // filterを使って削除されたもの以外を抽出した配列を残す
              break
            default: 
              break
          }
      })

      console.log(productsInFavorite)

      dispatch(fetchProductsInFavorite(productsInFavorite))
    })
    return () => unsubscribe()
  }, [])

  return(
    <>
      <div className={classes.searchField}>
        <TextInput 
          fullWidth={false} label={"何かお探しですか？"} multiline={false}
          onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
        />
        <IconButton >
          <SearchIcon />
        </IconButton>
      </div>
      <div className={classes.flex}>
        <IconButton onClick={() => dispatch(push('/' + sid + '/' + uid + '/favorite'))}>
          <Badge badgeContent={productsInFavorite.length} color="secondary">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => dispatch(push('/' + sid + '/' + uid + '/mypage'))} >
          <FaceIcon />
        </IconButton>
        <IconButton onClick={(e) =>props.handleDrawerToggle(e)}>
          <MenuIcon />
        </IconButton>

      </div>
    </>
  )
}

export default HeaderMenus