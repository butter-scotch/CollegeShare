import React from 'react';
import { makeStyles } from '@material-ui/core';
import '../../assets/section.css'

const useStyles = makeStyles({
  root: {
    backgroundColor: "#656D6F",
    width: "100%",
    height: "200px"
  },
  copyright: {
    margin: "0 auto",
    textAlign: "center",
    color: "#fff",
    fontSize: 12
  }
})


const Footer = () => {
  const classes = useStyles()


  return(
    <div className={classes.root}>
      <p className={classes.copyright}>Copyright ©️CollegeShare</p>
    </div>
  )
  
}

export default Footer