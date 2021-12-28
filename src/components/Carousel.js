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
        const {src, rating, id} = mockup;
        return(
            <div key={src} className="slide image-card">
               <img src={src}></img>
                <StarRatingComponent mockupId={id} score={rating}/>
            </div>
        );
    });
    let carouselRef = useRef(null);
    return(
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
    );
}
export default Carousel;