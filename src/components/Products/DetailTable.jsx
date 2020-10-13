import React, {useState, useCallback, useEffect} from 'react'
import TableContainer from "@material-ui/core/TableContainer"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableRow from "@material-ui/core/TableRow"
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from '@material-ui/styles'
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import FavoritBorderIcon from "@material-ui/icons/FavoriteBorder"
import {AvatarCard} from '../UIkit/index'

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20
  },
  price: {
    // color: "red",
    fontSize: 30
  }
})

const DetailTable = (props) => {
  const classes = useStyles()

  console.log(props.seller)

  return (
    <TableContainer className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              商品名：
            </TableCell>
            <TableCell className={classes.title}>
              {props.name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              出品者情報：
            </TableCell>
            <TableCell>
              <AvatarCard seller={props.seller} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              カテゴリー：
            </TableCell>
            <TableCell>
              {props.gender + "," + props.category}
            </TableCell>
          </TableRow>
          <TableRow >
            <TableCell >
              値段（税抜）：
            </TableCell>
            <TableCell className={classes.price}>
              {"¥" + props.price.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )

}

export default DetailTable