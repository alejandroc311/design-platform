import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
function SignupForm({onSubmit}){
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInput(value, name){
        name == "email-input" ? setEmail(value) : setPassword(value);
    }
    function handleSubmit(event){
        event.preventDefault();
        onSubmit(email,password);
        setEmail(""); setPassword("");
    }
    return(
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <EmailInput userInput={email} onChange={handleInput}/>
            <PasswordInput userInput={password} onChange={handleInput}/>
            <button className="submit-button" type="submit">Sign Up</button>
            <h3>Already have an account? Sign in!</h3>
            <button onClick={() => navigate("/login")}>Sign In</button>
        </form>
    );
}
export default SignupForm;