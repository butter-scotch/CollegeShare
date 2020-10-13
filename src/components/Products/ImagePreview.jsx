import React from 'react';
import '../../assets/section.css'
import '../../assets/image.css'

const ImagePreriew = (props) => {
  return(
    <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
      <img alt="プレビュー画像" src={props.path} />
    </div>
  )
}

export default ImagePreriew