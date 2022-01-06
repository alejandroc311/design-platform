import React from 'react';
import ReactDOM from 'react-dom';
import AdminProfilePage from './pages/AdminProfilePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import store from './store/store.js';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminProyectDisplay from './components/AdminProyectDisplay';
import AdminPrivateRoute from './components/AdminPrivateRoute';
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
          <Route path="/adminProfile" element={
          <AdminPrivateRoute>
            <AdminProfilePage/>
          </AdminPrivateRoute>
          }>
            <Route path=":proyectId" element={
              <AdminProyectDisplay/>
            }/>
          </Route>
        </Routes>
      </Router>
    </Provider>
    ,
  document.getElementById('root')
);


