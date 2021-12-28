import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import store from './store/store.js';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import AdminLoginPage from './pages/AdminLoginPage';
ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/admin" element={<AdminLoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>  
          }/>  
        </Routes>
      </Router>
    </Provider>
    ,
  document.getElementById('root')
);


