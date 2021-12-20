import LoginForm from "../components/LoginForm";
import "./../stylesheets/login-page.css"
import { getUser } from "../store/slicers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {Navigate} from "react-router-dom";
import _ from 'underscore';
import { selectUser } from "../store/slicers/userSlice";
function LoginPage(){
    const user = useSelector(selectUser, _.isEqual);
    const dispatch = useDispatch();
    function handleSubmit(email, password){
        dispatch(getUser({email, password}));
    }
    return (
        user.id === "" ? 
            <div>
                <LoginForm onSubmit={handleSubmit}/>
            </div>
        : 
            <Navigate to="/profile"/> 
    );
}

export default LoginPage;