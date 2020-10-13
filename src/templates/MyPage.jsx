import React, {useCallback, useState} from 'react';
import Divider from '@material-ui/core/Divider'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import '../assets/text.css'
import '../assets/spacer.css'
import '../assets/section.css'
import {AvatarArea} from '../components/Products/index'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {push} from 'connected-react-router'
import { getSchoolId, getUserId, getUsername } from '../reducks/users/selectors';
import { signOut } from '../reducks/users/operations'
import { FormDialog} from '../components/Products/index'


const useStyles = makeStyles((theme) =>({
  root: {
    backgroundColor: "#f3f3f3"
  },
  username: {
    margin: '0 auto',
    textAlign: "center",
    fontSize: "0.8rem"
  }
}))

const MyPage = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)
  const username = getUsername(selector)

  console.log(username)

  const [image, setImage] = useState([])
  const [open, setOpen] = useState(false)

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  return(
    <div className="c-section-container-white">
      <h2 className={"u-text__headline u-text-center"}>My Page</h2>
      <Divider />
      <div className="module-spacer--medium" />
      <AvatarArea image={image} setImage={setImage} />
      <p className={classes.username} >{username}</p>
      <div className="module-spacer--medium" />
      <List className={classes.root} >
        <ListItem button 
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/product/edit'))}
        >
          <ListItemText primary={"出品する"} />
        </ListItem>
        <ListItem button 
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/sell'))}
        >
          <ListItemText primary={"出品中の商品の編集"} />
        </ListItem>
        <ListItem button 
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/order/history'))}
        >
          <ListItemText primary={"購入した商品"} />
        </ListItem>
        <ListItem button 
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/favorite'))}
        >
          <ListItemText primary={"いいね！リスト"} />
        </ListItem>
        <ListItem button >
          <ListItemText primary={"個人情報の編集"} />
        </ListItem>
        <ListItem button onClick={() => dispatch(signOut())}>
          <ListItemText primary={"ログアウト"} />
        </ListItem>
        <ListItem button 
          onClick={handleOpen}
        >
          <ListItemText primary={"お問い合わせ"} />
        </ListItem>
      </List>
      <FormDialog open={open} handleClose={handleClose} />
    </div>
  )

}

export default MyPage