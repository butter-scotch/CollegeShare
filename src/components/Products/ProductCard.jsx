import React, {useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import NoImage from '../../assets/img/src/no_image.png'
import { useSelector, useDispatch } from 'react-redux';
import {push} from 'connected-react-router'
import { getSchoolId, getUserId } from '../../reducks/users/selectors'
import { db,FirebaseTimestamp } from '../../firebase/index'
import {addProductToFavorite} from '../../reducks/users/operations'



const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% -  16px)'
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)'
    }
  },
  content: {
    // display: 'flex',
    padding: '16px 16px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: "red",
    fontSize: 16
  },
  description: {
    flexBasis: "60%"
  },
  text: {
      // maxWidth: 48,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
  },
  icon: {
    fontSize: 'medium'
  },
  right: {
    float: 'right'
  }
}))

const ProductCard = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const sid = getSchoolId(selector)
  const uid = getUserId(selector)

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
  const price = props.price.toLocaleString()
  const product = props.product

  console.log(product)

  const likeProduct = useCallback(() => {
    const timestamp = FirebaseTimestamp.now()
    dispatch(addProductToFavorite({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id
    }))
  }, [product])


  return(
    <Card className={classes.root}>
      <CardMedia 
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push('/' + sid + '/' + uid + '/product/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div 
          // className={classes.description}
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/product/' + props.id))}
        >
          <Typography color="textSecondary" component="p" className={classes.text}>
            {props.name}
          </Typography>
        </div>
        <div
          className={classes.description}
          onClick={() => dispatch(push('/' + sid + '/' + uid + '/product/' + props.id))}
        >
          <Typography className={classes.price} component="p" >
            {'¥ ' + price}
          </Typography>
        </div>
        <div className={classes.right}>
          <IconButton onClick={() => likeProduct()} >
            <FavoriteIcon fontSize="small"/>
          </IconButton>
          <IconButton >
            <ShareIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>

    </Card>
  )

}

export default ProductCard