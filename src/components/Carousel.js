import "glider-js/glider.min.css";
import { useRef } from "react";
import Glider from "react-glider";

function Carousel({imageUrls}){
    let imageCards = imageUrls.map((imageUrl) => {
        return(
            <div key={imageUrl} className="slide image-card">
               <img src={imageUrl}></img>
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