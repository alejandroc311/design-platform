import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "../store/slicers/sessionSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
function PrivateRoute({children}){
    const isAuthenticated = useSelector((state) => state.sessionSlice.isUserAuthenticated, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isUserAuthenticated());
    }, []);
    return( isAuthenticated ? children : <Navigate to="/"/>);
}
export default PrivateRoute;