import {React,useState} from 'react';
import axios from 'axios';
import {ReactComponent as LoadingIcon} from '../images/loading_icon2.svg';

function Signup(props) {
    const [label_class, setlabel_class] = useState({
        name_label:"formLabel",
        email_label:"formLabel",
        phone_label:"formLabel",
        password_label:"formLabel"
    })
    const inputClicked=(label)=>{
        setlabel_class({...label_class, [label] :"formLabel_focus"});
    }
    const [name,SetName] = useState("");
    const [email,SetEmail] = useState("");
    const [phone,SetPhone] = useState("");
    const [password,SetPassword] = useState("");
    const [error, setError] = useState("");
    const [process,setProcess] = useState(false);


    const SignUpHandler = async (e) =>{
      setProcess(true);
        e.preventDefault();
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

      axios.post(
      "https://online-food-backend-api.herokuapp.com/api/register",
      { name, email, phone, password },
      config).then(res => {
            localStorage.setItem("authToken", res.data.access_token);
            props.setLoginState(true);
            setProcess(false);
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
                <h2 className="form_heading">Sign up</h2>
                <button className="hide_form_btn" onClick={props.HideForm}>&#x2715;</button>
            </div>

            <p className="error">{error}</p>

            <form onSubmit={SignUpHandler}>
            <div className="signInUp_input">
            <label className={label_class.name_label}>Full Name</label>
            <input type="text" onClick={()=>inputClicked("name_label")} onChange={(e)=>SetName(e.target.value)} value={name} name="name" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.email_label}>Email</label>
            <input type="email" onClick={()=>inputClicked("email_label")} onChange={(e)=>SetEmail(e.target.value)} value={email} name="Email" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.phone_label}>Phone</label>
            <input type="tel" onClick={()=>inputClicked("phone_label")} onChange={(e)=>SetPhone(e.target.value)} value={phone} name="phone" placeholder="" autoComplete="on"/>
            </div>

            <div className="signInUp_input">
            <label className={label_class.password_label}>Password</label>
            <input type="password" onClick={()=>inputClicked("password_label")} onChange={(e)=>SetPassword(e.target.value)} value={password} name="password" placeholder="" autoComplete="on"/>
            </div>
        
            <div className="signup_btn_div"><button className="signup_btn">{!process?"Create Account":<LoadingIcon className="process_icon" />}</button></div>
            </form>
            <p className="signup_have">Already have an account? <button onClick={props.LoginForm}>Log in</button></p>
        </div>
        </div>
    )
}

export default Signup
