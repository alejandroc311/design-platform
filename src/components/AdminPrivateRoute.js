import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated as isAdminAuth } from "../store/slicers/sessionSlice";
function AdminPrivateRoute({children}) {
    const isAdminAuthenticated = useSelector((state = {}) => state.sessionSlice.isAdminAuthenticated, shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isAdminAuth());
    }, [])
    return (
        isAdminAuthenticated ? children : <Navigate to="/admin"/>
    );
}
export default AdminPrivateRoute;