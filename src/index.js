import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import store from './store/store.js';
ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage/>}/>
          <Route path="/app" element={<App/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
      </Router>
    </Provider>
    ,
  document.getElementById('root')
);


