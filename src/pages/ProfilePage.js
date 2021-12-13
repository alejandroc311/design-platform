import Carousel from "../components/Carousel";
import { selectMockups } from "../store/slicers/mockupsSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMockups } from "../store/slicers/mockupsSlice";
import { useDispatch } from "react-redux";
import { selectUser } from "../store/slicers/userSlice";
import { logout } from "../store/slicers/userSlice";
import _ from 'underscore';
function ProfilePage() {
    const dispatch = useDispatch();
    const mockups = useSelector(selectMockups, shallowEqual);
    const user = useSelector(selectUser, _.isEqual)
    const {proyectId} = user;
    console.log(mockups);
    const mockupsUrls = mockups.map(({src}) => src);
    function displayMockups(){
        return(
          mockups.length > 0 ? 
           <div className="carousel-wrapper">
             <Carousel imageUrls={mockupsUrls}>

             </Carousel>
           </div>
         :
           <div>
               <h3>
                   Oops! Still no mockups for this proyect ... 
               </h3>
           </div>
        );
    }
    useEffect(() => {
        dispatch(getMockups(proyectId))
    }, []);    
    return(
        <div>
            <h1>
                Profile
            </h1>
            <h3>
                Welcome, User No.{user.id}!
            </h3>
            <button id="logout-button" type="submit" onClick={() => dispatch(logout())} >Logout</button>
            {displayMockups()}
        </div>
        
    );
}

export default ProfilePage;