import { useEffect } from "react";
import { useHistory } from "react-router-dom";
const Protected = (props) =>{
    const history = useHistory();
    let Cmp = props.cmp;
    useEffect(() => {
        if (!localStorage.hasOwnProperty("authToken")) {
            props.LoginForm();
            history.push('/cart');
        }
        
    })
    return(
       
        localStorage.hasOwnProperty("authToken") ? <Cmp /> : ""
        
    )
}

export default Protected;