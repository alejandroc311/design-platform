import './App.css';
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector(state =>  state.userSlice);
  return(
    <div>
      Content
    </div>
  );

}

export default App;
