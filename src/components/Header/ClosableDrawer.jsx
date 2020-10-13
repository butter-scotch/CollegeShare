import React, {useCallback, useState, useEffect} from 'react'
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { makeStyles } from '@material-ui/core/styles'
import {TextInput} from '../UIkit/index'
import '../../assets/section.css'
import { useDispatch, useSelector } from 'react-redux'
import { push } from 'connected-react-router'
import { getUserId, getSchoolId } from '../../reducks/users/selectors'
import {db} from "../../firebase/index"


const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  headline: {
    fontSize: "1.3rem",
    textAlign: "center",
    padding: "10px 0",
    fontWeight: 600
  },
  root: {
    backgroundColor: "#f3f3f3"
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}))

const ClosableDrawer = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const sid = getSchoolId(selector)

  const [keyword, setKeyword] = useState("")

  const inputKeyword = useCallback((event) => {
    setKeyword(event.target.value)
  },[setKeyword])

  const selectMenu = (event, path) => {
    dispatch(push(path))
    props.onClose(event)
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: "すべて", id: "all", value: `/${sid}/${uid}/?gender=all`},
    {func: selectMenu, label: "メンズ", id: "male", value: `/${sid}/${uid}/?gender=male`},
    {func: selectMenu, label: "レディース", id: "female", value: `/${sid}/${uid}/?gender=female`}
  ])

  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push({func: selectMenu, label: category.name, id: category.id, value: `/${sid}/${uid}/?category=${category.id}`})
          
        })
        setFilters(prevState => [...prevState, ...list])
      })

  }, [])

  console.log(filters)

  return(
    <nav>
      <Drawer
        variant="temporary"
        // temporaryだと閉じたり開いたりができる
        anchor="left"
        open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
        // スマホで開いた時にDrawerメニューのパフォーマンスが上がる
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput 
              fullWidth={false} label={"検索"} multiline={false}
              onChange={inputKeyword} required={false} rows={1} value={keyword} type={"text"}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <h2 className={classes.headline}>カテゴリー</h2>
          <Divider />
          <List className={classes.root} >
            {filters.map(filter => (
              <ListItem 
                button 
                key={filter.id}
                onClick={(e) => filter.func(e, filter.value)}
              >
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer