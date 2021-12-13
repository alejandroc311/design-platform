import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slicers/userSlice";
function LandingPage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    useEffect(async () => {
        const accessToken = localStorage.getItem("platform-token");
        if (accessToken) {
            const checkUser = await fetch(
                "http://localhost:8080/authenticateUser",
                {
                method: "POST",
                body: JSON.stringify({
                accessToken
                }),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + `${localStorage.getItem("platform-token")}`
                }
            })
            .then( res => res.json())
            .catch( error => {
                console.error(error);
                return new Error("Error", error);
            });
            console.log(checkUser);
            if (checkUser instanceof Error) {
                navigate("/login");
            }
            else {
                const {body:{ user: {id, accountId, proyectId}}} =  checkUser;
                dispatch(setUser({id, accountId, proyectId}));
                navigate("/profile");
            }
        }
        else {
            navigate("/login");
        }
    }, 
    []);
    return(
        <div>
              
        </div>
    );
}
export default LandingPage; 