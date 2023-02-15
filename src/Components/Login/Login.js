import style from "./Login.module.css";
import { createAccountHandler, loginHandler } from "../Store/Authtication";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const signUpHandler = async (event) => {
    let user = await createAccountHandler(email, password);
    if (user) {
      localStorage.setItem("user", user);
    } else {
      alert("Please enter Username and Password");
    }
  };
  const signInHandler = async () => {
    let user = await loginHandler(email, password);
    if (user) {
      localStorage.setItem("user", user);
      history.replace("/AddColor");
    } else {
      alert("Please enter Username and Password");
    }
  };
  return (
    <div className={style.login}>
      <div>
        <h1>colorify</h1>
        <input onChange={emailChangeHandler} type={"email"} />
        <input onChange={passwordChangeHandler} type={"password"} />
        <div>
          <button onClick={signUpHandler}>Sign Up</button>
          <button onClick={signInHandler}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
