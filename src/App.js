import './App.css';
import { useSelector } from 'react-redux';
import { getUser } from './store/slicers/userSlice';
import { useDispatch } from 'react-redux';
import { getMockups } from './store/slicers/mockupsSlice';


function App() {
  const state = useSelector(state => state.mockupsSlice.entities)
  const userid = useSelector(state =>  state.userSlice.id);
  const dispatch = useDispatch();
  console.table(state);

  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
      Other Content
      <button onClick={() => dispatch(getMockups(userid))}></button>
    </div>
  );

}

export default App;
