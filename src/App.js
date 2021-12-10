import './App.css';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import { getUser, selectUser } from './store/slicers/userSlice';
import { useDispatch, shallowEqual, } from 'react-redux';
import { getMockups, selectMockups} from './store/slicers/mockupsSlice';
function App() {

  //the user is the selector updating b/c it's returning nested object. 
  //if user selector is removed, the re-render stops. 
  //thus the problem is getMockups.fulfilled. 
  //This is resolved by adding a deep equal to the user memoized selector. 
  const mockups = useSelector(selectMockups, shallowEqual)
  const user = useSelector(selectUser, _.isEqual);
  const dispatch = useDispatch();
  console.log(mockups);
  console.log(user);
  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
      Other Content
      <button onClick={() => dispatch(getMockups("1"))}></button> 
    </div>
  );
}

export default App;
