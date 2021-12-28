import { useDispatch } from "react-redux";
import AdminLoginForm from "../components/AdminLoginForm";
function AdminLoginPage(){
    const dispatch = useDispatch();
    function handleSubmit(email, password){
        //dispatch(getAdmin({email, password}))
    }
    return (
        <div>
            <AdminLoginForm onSubmit={handleSubmit}/>
        </div>
    );
}
export default AdminLoginPage;