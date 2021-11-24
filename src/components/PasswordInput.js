function PasswordInput({userInput, onChange}){
    function handleChange({target:{value, name}}){
        onChange(value, name);
    }
    return(
        <div className="form-item">
            <label htmlFor="password-input">Password</label>
            <input type="password" onChange={handleChange} value={userInput} name="password-input" className="password-input" placeholder="Your password" required></input>
        </div>
    )
}
export default PasswordInput;