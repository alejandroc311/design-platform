import SignupForm from "../components/SignupForm";
import {throwError} from "../store/slicers/sessionSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignupPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(email, password){
        const createUser = await fetch(
            "http://localhost:8080/createUser",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        )
        .then(res => res.json())
        .catch(error => new Error("Error on Sign-up", {cause:error}));
        createUser instanceof Error ? dispatch(throwError({error: "SIGN_UP_ERROR"})) : navigate("/login")
    }
    return(
        <SignupForm onSubmit={handleSubmit}/>
    );
}
export default SignupPage;