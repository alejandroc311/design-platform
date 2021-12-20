import "glider-js/glider.min.css";
import { useRef } from "react";
import Glider from "react-glider";
import StarRatingComponent from "./StarRatingComponent";
function Carousel({imageUrls}){
    let imageCards = imageUrls.map((imageUrl) => {
        return(
            <div key={imageUrl} className="slide image-card">
               <img src={imageUrl}></img>
                <StarRatingComponent/>
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
            slidesToShow={2}
            slidesToScroll={1}
            scrollToSlide={1}
        >
            {imageCards}
        </Glider>
    );
}
export default Carousel;