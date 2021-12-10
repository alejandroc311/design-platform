import { useSelector } from "react-redux";
import { selectUser } from "../store/slicers/userSlice";
import _ from 'underscore';
import { Navigate } from "react-router-dom";
function PrivateRoute({children}){
    console.log(children);
    const user = useSelector(selectUser, _.isEqual)
    let {isLoggedIn} = user; 
    return( isLoggedIn === true ? children : <Navigate to="/"/>);
}
export default PrivateRoute;