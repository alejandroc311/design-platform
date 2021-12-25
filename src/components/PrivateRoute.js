import { shallowEqual, useSelector } from "react-redux";
import _ from 'underscore';
import { Navigate } from "react-router-dom";;
function PrivateRoute({children}){
    const isAuthenticated = useSelector((state) => state.sessionSlice.isUserAuthenticated, shallowEqual);
    return( isAuthenticated === true ? children : <Navigate to="/"/>);
}
export default PrivateRoute;