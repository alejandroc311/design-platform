import Carousel from "../components/Carousel";
import "./../stylesheets/profile-page.css"
import { selectMockups } from "../store/slicers/mockupsSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMockups } from "../store/slicers/mockupsSlice";
import { useDispatch} from "react-redux";
import { logUserOut, selectUser } from "../store/slicers/userSlice";
import _ from 'underscore';
function ProfilePage() {
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const mockups = useSelector(selectMockups, _.isEqual);
    const user = useSelector(selectUser, _.isEqual); const {proyectId} = user;
    
    function handleChange({target:{value}}) {
        setComment(value);
    }
    function submitComment(){
        fetch(
            "http://localhost:8080/setProyectComment",
            {
                method: "POST",
                body: JSON.stringify({
                    proyectId, comment
                }),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("platform-token")}`
                }
            }
        )
        .then(setComment(""))
        .catch((error) => {
            console.error(error);
        });
        //DISPATCH COMMENT ERROR SESSION
    }
    useEffect(() => {
        dispatch(getMockups(proyectId))
    }, [mockups]);    
    return(
        <div>
            <h1>
                Profile
            </h1>
            <h3>
                Welcome, User No.{user.id}!
            </h3>
            <button id="logout-button" type="submit" onClick={() => dispatch(logUserOut())} >Logout</button>
            <div className="carousel-wrapper">
                <Carousel/>
            </div>
            <div className="comment-section">
                <label htmlFor="comment-textarea">Comment</label>
                <textarea className="comment-textarea" placeholder="Leave a comment here ..." value={comment} onChange={handleChange}></textarea>
                <button onClick={submitComment}>Submit</button>
            </div>
            
        </div>
        
    );
}

export default ProfilePage;