import {React, useState } from 'react';
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../images/loading_icon2.svg';

function Login(props) {

    const [label_class, setlabel_class] = useState({
        email_label:"formLabel",
        password_label:"formLabel"
    })
    const inputClicked=(label)=>{
        setlabel_class({...label_class, [label] :"formLabel_focus"});
    }

    let [email,SetEmail] = useState("");
    let [password,SetPassword] = useState("");
    const [error, setError] = useState("");
    const [process,setProcess] = useState(false);

    function GuestLogin(e){
        e.preventDefault();
        email = "rk@gmail.com";
        password = "12345678";
         LoginHandler(e,true);
      }


    const LoginHandler = async (e) =>{
        setProcess(true);
        e.preventDefault();
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };
      axios.post(
      "https://online-food-backend-api.herokuapp.com/api/login",
      { email, password },
      config).then(res => {
            localStorage.setItem("authToken", res.data.access_token);
            setProcess(false);
            props.setLoginState(true);
    })
    .catch(err => {
        setProcess(false);
        if (err.response) {
          setError(err.response.data.message);
          setTimeout(() => {
                  setError("");
                }, 5000);
        }
    })}



    return (
        <div className="signnup_div_parent">
        <div className="signnup_div">
            
        <div className="form_heading_div">
                <h2 className="form_heading">Login</h2>
                <button className="hide_form_btn" onClick={props.HideForm}>&#x2715;</button>
            </div>
            <p className="error">{error}</p>

            <form onSubmit={LoginHandler}>
            <div className="signInUp_input">
            <label className={label_class.email_label}>Email</label>
            <input type="email" onClick={()=>inputClicked("email_label")} onChange={(e)=>SetEmail(e.target.value)} value={email} name="Email" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.password_label}>Password</label>
            <input type="password" onClick={()=>inputClicked("password_label")} onChange={(e)=>SetPassword(e.target.value)} value={password} name="password" placeholder="" autoComplete="off"/>
            </div>
        
            <div className="signup_btn_div">
                <button className="signup_btn">{!process?"Login":<LoadingIcon className="process_icon" />}</button>
                <button onClick={(e)=>GuestLogin(e)} className="signup_btn">Login as Guest</button>
            </div>
            </form>
            <p className="signup_have">New to Tomato? <button onClick={props.SignupForm}>Create account</button></p>
        </div>
        </div>
    )
}

export default Login
