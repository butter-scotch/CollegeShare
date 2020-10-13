import React, { useState, useCallback } from "react";
import Divider from "@material-ui/core/Divider";
import "../assets/section.css";
import "../assets/text.css";
import "../assets/spacer.css";
import { TextInput, PrimaryButton } from "../components/UIkit";
import { signIn } from "../reducks/users/operations";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
      setEmail(event.target.value);
    },[setEmail]);

  const inputPassword = useCallback((event) => {
      setPassword(event.target.value);
    },[setPassword]);

  return (
    <div className={"c-section-container"}>
      <h2 className={"u-text__headline u-text-center"}>College Share</h2>
      <div className={"c-section-container-white"}>
        <h2 className={"u-text__headline u-text-center"}>サインイン</h2>
        <Divider />
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true}
          label={"メールアドレス"}
          multiline={false}
          required={true}
          rows={1}
          value={email}
          variant={"outlined"}
          type={"email"}
          onChange={inputEmail}
        />
        <TextInput
          fullWidth={true}
          label={"パスワード"}
          multiline={false}
          required={true}
          rows={1}
          value={password}
          variant={"outlined"}
          type={"password"}
          onChange={inputPassword}
        />
        <div className={"module-spacer--medium"}></div>
        <div className={"center"}>
          <PrimaryButton
            label={"Sign In"}
            onClick={() => dispatch(signIn(email, password))}
          />
          <div className="module-spacer--medium" />
          <p onClick={() => dispatch(push("./signup"))}>アカウントをお持ちでない方はこちら</p>
          <p onClick={() => dispatch(push("./signin/reset"))}>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
