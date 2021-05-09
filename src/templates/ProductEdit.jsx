import React, {useState, useCallback, useEffect} from 'react'
import '../assets/section.css'
import '../assets/text.css'
import '../assets/spacer.css'
import {SelectBox ,TextInput, PrimaryButton} from '../components/UIkit'
import Divider from '@material-ui/core/Divider'
import {saveProduct} from '../reducks/schools/operations'
import { useDispatch, useSelector } from 'react-redux'
import { ImageArea } from '../components/Products'
import { getSchoolId, getUserId } from '../reducks/users/selectors'
import {db} from "../firebase/index"


const ProductEdit = () => {
  const dispatch = useDispatch()
  let sellid = window.location.pathname.split('/product/edit')[1]

  let uid = window.location.pathname.split('/')[2]

  console.log(sellid)
  console.log(uid)
  
  if (sellid !== "") {
    sellid = sellid.split('/')[1]
    console.log(sellid)
  }



  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [price, setPrice] = useState(""),
        [category, setCategory] = useState(""),
        [categories, setCategories] = useState([]),
        [gender, setGender] = useState(""),
        [size, setSize] = useState(""),
        [images, setImages] = useState([]),
        [id, setId] = useState(""),
        [seller, setSeller] = useState(null)

  const inputName = useCallback((event) => {
    setName(event.target.value)
  }, [setName])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [setDescription])

  const inputPrice = useCallback((event) => {
    setPrice(event.target.value)
  }, [setPrice])



  const genders = [
    {id: "all", name: "すべて"},
    {id: "male", name: "メンズ"},
    {id: "female", name: "レディース"}
  ]

  const sizes = [
    {id: "xs", name: "XS"},
    {id: "s", name: "S"},
    {id: "m", name: "M"},
    {id: "l", name: "L"},
    {id: "xl", name: "XL"}
  ]

  useEffect(() => {
    if (sellid !== "") {
      db.collection('users').doc(uid).collection('sells').doc(sellid).get()
        .then(snapshot => {
          const data = snapshot.data()
          setImages(data.images)
          setName(data.name)
          setDescription(data.description)
          setCategory(data.category)
          setGender(data.gender)
          setPrice(data.price)
          setSize(data.size)
          setId(data.id)
          setSeller(data.seller)
        })
    }

  }, [sellid])

  useEffect(() => {
    db.collection('categories').orderBy('order', 'asc').get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const data = snapshot.data()
          list.push({
            id: data.id,
            name: data.name
          })
        })
        setCategories(list)
      })
  }, [])

  console.log(id)

  useEffect(() => {
    db.collection('users').doc(uid).get()
      .then(snapshot => {
        const data = snapshot.data()

        const sellername = data.username
        const sellericon = data.icon
        const sellerid = data.uid
        const information = {name: sellername, icon: sellericon, uid: sellerid}

        setSeller(information)
      })
  }, [])

  return(
    <section >
      <div className={"c-section-container-white"}>
        <h2 className={"u-text__headline u-text-center"}>商品の出品・編集</h2>
        <Divider />
        <div className="module-spacer--medium" />
        <ImageArea images={images} setImages={setImages} />
        <TextInput 
          fullWidth={true} label={"商品名（必須）"} multiline={false} required={true} 
          rows={1} value={name} variant={"outlined"} type={"text"} onChange={inputName}      
        />
        <TextInput 
          fullWidth={true} label={"商品説明（必須）"} multiline={true} required={true} 
          rows={5} value={description} variant={"outlined"} type={"text"} onChange={inputDescription}      
        />
        <TextInput 
          fullWidth={true} label={"価格（必須）"} multiline={false} required={true} 
          rows={1} value={price} variant={"outlined"} type={"number"} onChange={inputPrice}      
        />
        <SelectBox 
          label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
        />
        <SelectBox 
          label={"性別"} required={true} options={genders} select={setGender} value={gender}
        />
        <SelectBox 
          label={"サイズ"} required={true} options={sizes} select={setSize} value={size}
        />
        <div className={"module-spacer--small"} />
        <div className={"center"}>
          <PrimaryButton 
              label={"商品情報を保存"}
              onClick={() => dispatch(saveProduct(sellid, id, name, description, images, price, category, gender, size, seller))}
            />
        </div>
        <div className={"module-spacer--small"} />
      </div>
    </section>
  )
}

export default ProductEdit
