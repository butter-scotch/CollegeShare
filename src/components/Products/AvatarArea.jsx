import React, {useState ,useCallback, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import {storage, db} from "../../firebase/index"
import { useDispatch, useSelector } from 'react-redux';
import {addIcon} from '../../reducks/users/operations'
import { getUserIcon, getUsername, getSignedIn, getSchoolname, getUserId } from '../../reducks/users/selectors';


const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center"
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}))


const AvatarArea = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const icon = getUserIcon(selector)
  const uid = getUserId(selector)

  const image = props.image
  const setImage = props.setImage
  
  const uploadImage = useCallback((event) => {
    const file = event.target.files
    let blob = new Blob(file, {type: "image/jpeg"})
  
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    const N = 16
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
                          .map((n) => S[n%S.length]).join('')

    const uploadRef = storage.ref('avatars').child(fileName)
    const uploadTask = uploadRef.put(blob)

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        const newImage = {id: fileName, path: downloadURL}
        setImage(newImage)
      })

    })

  }, [setImage])

  useEffect(() => {
    dispatch(addIcon(image))
  }, [image])

  useEffect(() => {
    db.collection('users').doc(uid).get()
      .then(doc => {
        const data = doc.data()
        const icon = data.icon
        setImage(icon)
      })
  }, [])



  console.log(image)
  console.log(icon)

  return(
    <div className={classes.root}>
      {image ? (
        <IconButton >
          <label>
            <Avatar className={classes.avatar} src={image.path}></Avatar>
            <input className="u-display-none" type="file" id="image" 
                  onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      ) : (
        <IconButton >
          <label>
            <Avatar className={classes.avatar} ></Avatar>
            <input className="u-display-none" type="file" id="image" 
                  onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      )}
    </div>
  )
}

export default AvatarArea