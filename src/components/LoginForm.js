import { useState } from "react";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
function LoginForm({onSubmit}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            <h1>Login</h1>
            <EmailInput userInput={email} onChange={handleInput}/>
            <PasswordInput userInput={password} onChange={handleInput}/>
            <button className="submit-button" type="submit">Sign In</button>
        </form>
    );
}

export default LoginForm;