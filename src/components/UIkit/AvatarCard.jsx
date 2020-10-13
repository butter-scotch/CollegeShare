import React from 'react'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'


const AvatarCard = (props) => {

  const seller = props.seller
  const icon = seller.icon

  console.log(seller)

  return(
    <CardHeader 
      avatar ={
        <Avatar src={icon.path} alt="i"/>
      }
      title = {seller.name}
    />
  )
}

export default AvatarCard