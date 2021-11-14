import './App.css';
import { useSelector } from 'react-redux';
import { getUser } from './store/slicers/userSlice';
import { useDispatch } from 'react-redux';
import { getMockups, selectMockups } from './store/slicers/mockupsSlice';


function App() {
  const state = useSelector(selectMockups)
  const userid = useSelector(state =>  state.userSlice.id);
  const dispatch = useDispatch();
  console.table(state);

  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
      Other Content
      <button onClick={() => dispatch(getMockups("566sdsdd3er3r56544efe5"))}></button>
    </div>
  );

}

export default App;
