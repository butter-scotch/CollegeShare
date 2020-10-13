import React, { useState, useCallback } from 'react'
import {makeStyles} from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import ToolBar from "@material-ui/core/Toolbar"
import Logo from '../../assets/img/VBFL9404.PNG'
import {ClosableDrawer ,HeaderMenus} from './index'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from "@material-ui/icons/Menu"
import {TextInput} from '../UIkit/index'
import IconButton from "@material-ui/core/IconButton"
import { useSelector, useDispatch } from 'react-redux'
import { getSchoolname, getSchoolId, getUserId, getSignedIn } from '../../reducks/users/selectors'
import { push } from 'connected-react-router'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444",
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%',
    height: "110px",
  },
  iconButton: {
    // margin: '0 0 0 auto',
  },
  name: {
    textAlign: "center",
    margin: '0 auto',
    fontSize: "2em",
    color: "#4EC9FF",
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.3em"
    }
  }
}))


const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getSignedIn(selector)
  const schoolname = getSchoolname(selector)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)

  const [open, setOpen] = useState(false)
  
  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(!open)
  },[setOpen, open])

  console.log(isSignedIn)

  return(
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <ToolBar className={classes.toolBar}>
          <img  
            src={Logo} alt="CollegeShare logo" width="80px"
            onClick={() => dispatch(push('/' + sid + '/' + uid))}
          />
          {isSignedIn && (
            <>
              <h2 className={classes.name}>{schoolname}</h2>
              <div className={classes.iconButton}>
                <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
              </div>
              <ClosableDrawer open={open} onClose={handleDrawerToggle} />
            </>
          )}
        </ToolBar>
      </AppBar>
    </div>
  )

}

export default Header