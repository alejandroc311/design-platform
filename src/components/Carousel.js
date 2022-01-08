import { shallowEqual, useSelector } from "react-redux";
import { selectMockups } from "../store/slicers/mockupsSlice";
import _ from 'underscore';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import StarRatingComponent from "./StarRatingComponent";
import { useEffect } from "react";
function CarouselDisplay(){
    const mockups = useSelector(selectMockups, shallowEqual);
    let imageCards = mockups.map((mockup) => {
        const {src, rating, id, proyectId} = mockup;
        return(
            <div key={src} className="slide image-card">
               <img src={src}></img>
                <StarRatingComponent proyectId={proyectId} mockupId={id} score={rating}/>
            </div>
        );
    });
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };
    useEffect(()=> {

    }, [mockups])
    return(
        mockups.length > 0 ?
    
            <Carousel
            arrows={true} 
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            infinite={false}
            centerMode={false}
            itemClass={"carousel-item"}
            partialVisbile={true}
            >
                {imageCards}        
            </Carousel>
        :
            <h3>
                Oops! Still no mockups for this proyect ... 
            </h3>
    );
}
export default CarouselDisplay;