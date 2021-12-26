import { shallowEqual, useSelector } from "react-redux";

function EmailInput({onChange, userInput}) {
    const signInError = useSelector((state) => state.sessionSlice.userCredentialsError, shallowEqual);
    console.log(signInError);
    function handleChange({target: {value, name}}){
        onChange(value, name);
    }
    
    return (
        <div className="form-item">
            <label htmlFor="email-input">Email</label>
            <input type="email" name="email-input" className="email-input" value={userInput} onChange={handleChange} placeholder="email@youremail.com" required></input>
        </div>
    );
}

export default EmailInput;