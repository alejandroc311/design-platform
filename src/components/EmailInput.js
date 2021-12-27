import { shallowEqual, useSelector } from "react-redux";

function EmailInput({onChange, userInput}) {
    const signInErrorClass = "email-input-signin-error";
    const signUpErrorClass = "email-input-signup-error";
    const signInError = useSelector((state) => state.sessionSlice.userCredentialsError, shallowEqual);
    const signUpError = useSelector((state) => state.sessionSlice.userExistsError, shallowEqual);
    function handleChange({target: {value, name}}){
        onChange(value, name);
    }
    function displayEmailInput(){
        if(signInError){
            return (
                <div className="form-item">
                    <p>Invalid email/password ...</p>
                    <label htmlFor="email-input">Email</label>
                    <input type="email" name="email-input" className={signInErrorClass} value={userInput} onChange={handleChange} placeholder="email@youremail.com" required></input>
                </div>
            );
        }
        else if(signUpError) {
            return(
                <div className="form-item">
                    <p>User already exists ...</p>
                    <label htmlFor="email-input">Email</label>
                    <input type="email" name="email-input" className={signUpErrorClass} value={userInput} onChange={handleChange} placeholder="email@youremail.com" required></input>
                </div>
            );
        }
        else {
            return(
                <div className="form-item">
                    <label htmlFor="email-input">Email</label>
                    <input type="email" name="email-input" className="email-input" value={userInput} onChange={handleChange} placeholder="email@youremail.com" required></input>
                </div>
            );
        }
    }
    return (
        <div>
            {displayEmailInput()}
        </div>
    );
}

export default EmailInput;