import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Root from '../pages/Root';
import Register from '../pages/Register';
import OtpVerification from '../pages/OtpVerification';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Problems from '../pages/Problems';
import IndividualProblem from '../pages/IndividualProblem';
import LevelWiseProblemSet from '../pages/LevelWiseProblemSet';
import Competition from '../pages/Competition';
import Artciles from '../pages/Articles';
import Tutorials from '../pages/Tutorials';
import Leaderboard from '../pages/Leaderboard';

const Routers = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Navigate to='/home'/>}/> */}
      <Route path='/' element={<Root />} />
      <Route path='/register' element={<Register />} />
      <Route path='/otpVerification' element={<OtpVerification />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/problem/:levelName/:ID' element={<IndividualProblem/>} />
      <Route path='/problems/:levelName' element={<LevelWiseProblemSet />} />
      <Route path='/competition' element={<Competition/>} />
      <Route path='/articles' element={<Artciles/>} />
      <Route path='/tutorials' element={<Tutorials/>} />
      <Route path='/leaderboard' element={<Leaderboard/>} />
    </Routes>
  );
}

export default Routers;
