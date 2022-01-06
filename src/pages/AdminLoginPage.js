import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAdmin } from "../store/slicers/adminSlice";
import AdminLoginForm from "../components/AdminLoginForm";
import _ from 'underscore';
import { Navigate } from "react-router-dom";
function AdminLoginPage(){
    const adminId = useSelector((state = {}) => state.adminSlice.id, shallowEqual);
    const dispatch = useDispatch();
    function handleSubmit(email, password){
        dispatch(getAdmin({email, password}))
    }
    return (
        adminId === "" ?
            <div>
                <AdminLoginForm onSubmit={handleSubmit}/>
            </div>
           
        :
            <Navigate to="/adminProfile"/>
    );
}
export default AdminLoginPage;