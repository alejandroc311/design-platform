import './App.css';
import _ from 'underscore';
import { useSelector } from 'react-redux';
import { getUser, selectUser } from './store/slicers/userSlice';
import { useDispatch, shallowEqual} from 'react-redux';
import { getMockups, selectMockups} from './store/slicers/mockupsSlice';


function App() {
  const mockups = useSelector(selectMockups, shallowEqual)
  const user = useSelector(selectUser, shallowEqual);
  const dispatch = useDispatch();
  console.log(mockups);
  console.log(user);

  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
      Other Content
      <button onClick={() => dispatch(getMockups("1asa2133566sd5as"))}></button>
    </div>
  );

}

export default App;
