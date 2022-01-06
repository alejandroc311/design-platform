import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
function AdminLoginForm({onSubmit}){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleSubmit(event){
        event.preventDefault();
        onSubmit(email, password);
        setEmail(""); setPassword("");
    }
    function handleInput(value, name){
        name === "email-input" ? setEmail(value) : setPassword(value);
    }
    return(
        <form onSubmit={handleSubmit} className="login-form">
            <h1>Admin Login</h1>
            <EmailInput onChange={handleInput} userInput={email}/>
            <PasswordInput onChange={handleInput} userInput={password}/>
            <button className="submit-button" type="submit">Sign In</button>
            <h3>Are you a regular user? Sign in!</h3>
            <button onClick={() => navigate("/login")}>User Sign in</button>
        </form>
    );
}
export default AdminLoginForm;