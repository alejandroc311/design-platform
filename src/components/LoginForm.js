import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
function LoginForm({onSubmit}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    function handleInput(value, name){
        name == "email-input" ? setEmail(value) : setPassword(value);
    }
    function handleSubmit(event){
        event.preventDefault();
        onSubmit(email, password);
        setEmail(""); setPassword("");
    }

    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h1>User Login</h1>
            <EmailInput userInput={email} onChange={handleInput}/>
            <PasswordInput userInput={password} onChange={handleInput}/>
            <button className="submit-button" type="submit">Sign In</button>
            <h3>Don't have an account? Sign up!</h3>
            <button onClick={() => navigate("/signup")}>Sign Up</button>
            <h3>Are you an Admin? Sign in!</h3>
            <button onClick={() => navigate("/admin")}>Admin Sign In</button>
        </form>
    );
}

export default LoginForm;