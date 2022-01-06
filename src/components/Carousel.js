import "glider-js/glider.min.css";
import { useRef } from "react";
import Glider from "react-glider";
import { useSelector } from "react-redux";
import { selectMockups } from "../store/slicers/mockupsSlice";
import _ from 'underscore';
import StarRatingComponent from "./StarRatingComponent";
function Carousel(){
    const mockups = useSelector(selectMockups, _.isEqual);
    let imageCards = mockups.map((mockup) => {
        const {src, rating, id, proyectId} = mockup;
        return(
            <div key={src} className="slide image-card">
               <img src={src}></img>
                <StarRatingComponent proyectId={proyectId} mockupId={id} score={rating}/>
            </div>
        );
    });
    let carouselRef = useRef(null);
    return(
        mockups.length > 0 ? 
        <Glider
            ref={carouselRef}
            draggable
            hasArrows
            hasDots
            slidesToShow={3}
            slidesToScroll={1}
            scrollToSlide={1}
        >
            {imageCards}
        </Glider>
        :
        <h3>
            Oops! Still no mockups for this proyect ... 
        </h3>
    );
}
export default Carousel;