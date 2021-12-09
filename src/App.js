import './App.css';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import { getUser, selectUser } from './store/slicers/userSlice';
import { useDispatch, shallowEqual, } from 'react-redux';
import { getMockups, selectMockups} from './store/slicers/mockupsSlice';
import Carousel from './components/Carousel';


function App() {

  //the user is the selector updating b/c it's returning nested object. 
  // if user selector is removed, the re-render stops. 
  // thus the problem is getMockups.fulfilled. 
  //This is resolved by adding a deep equal to the user memoized selector. 
  const mockups = useSelector(selectMockups, shallowEqual)
  const user = useSelector(selectUser, _.isEqual);
  const dispatch = useDispatch();
  console.log(mockups);
  console.log(user);
  function displayMockups(){
   return(
     mockups.length > 0 ? 
      <div className="carousel-wrapper">
        <Carousel imageUrls={mockupsUrls}>
  
        </Carousel>
      </div>
    :
      <div>

      </div>
      
  );
}
  let mockupsUrls = mockups.map(({src}) => src);
  let array = [1, 2, 3, 4];
  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
      Other Content
      <button onClick={() => dispatch(getMockups("1"))}></button>
      {
       displayMockups() 
      }
      
      
    </div>
  );

}

export default App;
