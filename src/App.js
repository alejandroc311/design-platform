import './App.css';
import { useSelector } from 'react-redux';



function App() {
  const user = useSelector(state =>  console.table(state));
  return(
    <div>
      Content
    </div>
  );

}

export default App;
