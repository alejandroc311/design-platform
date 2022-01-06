import { useEffect } from "react";
import Carousel from "./Carousel";  
import { useDispatch, useSelector } from "react-redux";
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
        <div className="carousel-wrapper">
            <Carousel/>
        </div>
    );
}
export default AdminProyectDisplay;