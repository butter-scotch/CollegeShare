import React, {useState, useCallback} from 'react'
import '../assets/section.css'
import '../assets/text.css'
import '../assets/spacer.css'
import {TextInput, PrimaryButton} from '../components/UIkit'
import Divider from '@material-ui/core/Divider'
import { useDispatch } from 'react-redux'
import {resetPassword} from '../reducks/users/operations'
import { push } from "connected-react-router";

const Reset = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value);
  },[setEmail]);

  return(
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>College Share</h2>
      <div className={"c-section-container-white"}>
        <h2 className={"u-text__headline u-text-center"}>パスワードのリセット</h2>
        <Divider />
        <div className="module-spacer--medium" />
        <TextInput 
          fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
          rows={1} value={email} variant={"outlined"} type={"email"} onChange={inputEmail}      
        />
        <div className={"module-spacer--medium"}></div>
        <div className={"center"}>
          <PrimaryButton 
            label={"Reset Password"} 
            onClick={() => dispatch(resetPassword(email))}
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push('../signin'))}>ログイン画面に戻る</p>
        </div>
      </div>
    </div>
  )
}

export default Reset