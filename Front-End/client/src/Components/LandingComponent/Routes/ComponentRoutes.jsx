import React from 'react';
import {Routes, Route} from 'react-router-dom'
import LandingPage from '../LandingComponent/LandingPage';
import About from '../AboutComponent/About';
import Accessory from '../AccessoryComponent/Accessory';
import Home from '../HomeComponent/Home';
import Hospital from '../HospitalComponent/Hospital';
import Donate from '../DonateComponent/Donate';
import Dog from '../DogComponent/Dog';
import Login from '../LoginComponent/Login';

function ComponentRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/shop' element={<Accessory />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/hospital' element={<Hospital />}></Route>
        <Route path='/donate' element={<Donate />}></Route>
        <Route path='/adopt' element={<Dog />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default ComponentRoutes;
