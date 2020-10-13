import React from 'react'
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  "button": {
    backgroundColor: "#F50158",
    color: "#fff",
    fontSize: 16,
    height: 48,
    marginButtom: 16,
    width: 256
  }
})

const RedButton = (props) => {
  const classes = useStyles()

  return (
    <Button variant="contained" className={classes.button} onClick={() => props.onClick()} >
      {props.label}
    </Button>
  )

}

export default RedButton