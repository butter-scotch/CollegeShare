import React, {useState, useCallback} from 'react'
import Divider from '@material-ui/core/Divider'
import '../assets/section.css'
import '../assets/text.css'
import '../assets/spacer.css'
import {TextInput, PrimaryButton} from '../components/UIkit'
import {signUp} from '../reducks/users/operations'
import {useDispatch} from 'react-redux'
import { push } from "connected-react-router";

const SignUp = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [schoolname, setSchoolname] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("")

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])

  const inputSchoolname = useCallback((event) => {
    setSchoolname(event.target.value)
  }, [setSchoolname])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  return(
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>College Share</h2>
      <div className={"c-section-container-white"}>
        <h2 className={"u-text__headline u-text-center"}>新規会員登録</h2>
        <Divider />
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true} label={"ユーザー名"} multiline={false} required={true} 
          rows={1} value={username} variant={"outlined"} type={"text"} onChange={inputUsername}
        />
        <TextInput 
          fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
          rows={1} value={email} variant={"outlined"} type={"email"} onChange={inputEmail}      
        />
        <TextInput 
          fullWidth={true} label={"大学名"} multiline={false} required={true} 
          rows={1} value={schoolname} variant={"outlined"} type={"text"} onChange={inputSchoolname}      
        />
        <TextInput 
          fullWidth={true} label={"パスワード"} multiline={false} required={true} 
          rows={1} value={password} variant={"outlined"} type={"password"} onChange={inputPassword}      
        />
        <TextInput 
        fullWidth={true} label={"パスワード（確認）"} multiline={false} required={true} 
        rows={1} value={confirmPassword} variant={"outlined"} type={"password"} onChange={inputConfirmPassword}      
        />
        <div className={"module-spacer--medium"}></div>
        <div className={"center"}>
          <PrimaryButton 
            label={"アカウントを登録する"} 
            onClick={() => dispatch(signUp(username, email, schoolname, password, confirmPassword))}
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push('./signin'))}>アカウントをお持ちの方はこちら</p>
        </div>
      </div>
    </div>
  )
}

export default SignUp