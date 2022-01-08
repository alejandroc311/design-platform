import { useEffect } from "react";
import CarouselDisplay from "./Carousel";  
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMockups } from "../store/slicers/mockupsSlice";
import _ from 'underscore';

function AdminProyectDisplay () {
    const dispatch = useDispatch();
    const {proyectId} = useParams();
    useEffect(() => {
        dispatch(getMockups(proyectId))
    }, [proyectId]);
    return(
        <div>
            <div id="proyect-header">
            <h1>
                Proyect No. {proyectId}
            </h1>    
            </div>   
            
            <div className="carousel-wrapper">
                <CarouselDisplay/>
            </div>
        </div>
        
    );
}
export default AdminProyectDisplay;