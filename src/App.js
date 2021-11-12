import './App.css';
import { useSelector } from 'react-redux';
import { getUser } from './store/slicers/userSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const user = useSelector(state =>  state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {console.table(user)}, [user])
  return(
    <div>
      Content
      <button onClick={() => dispatch(getUser())}></button>
    </div>
  );

}

export default App;
