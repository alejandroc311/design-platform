function EmailInput({onChange, userInput}) {

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