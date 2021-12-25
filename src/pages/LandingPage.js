import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { isUserAuthenticated } from "../store/slicers/sessionSlice";
function LandingPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.sessionSlice.isUserAuthenticated, shallowEqual);
    useEffect(() => {
        dispatch(isUserAuthenticated());
        isAuthenticated ? navigate("/profile") : navigate("/login");
    },[]);   
    return(
        <div>

        </div>
    );
}
export default LandingPage; 