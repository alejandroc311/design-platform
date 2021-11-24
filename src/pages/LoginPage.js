import LoginForm from "../components/LoginForm";
import "./../stylesheets/login-page.css"
import { getUser } from "../store/slicers/userSlice";
import { useDispatch } from "react-redux";
function LoginPage(){
    const dispatch = useDispatch();
    function handleSubmit(email, password){
        console.log(email, password);
    }

    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default LoginPage;