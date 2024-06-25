import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Register from '../pages/Register'

const Routers = () => {
  return (
    <Routes>
        {/* <Route path='/' element={<Navigate to='/home'/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
    
    </Routes>
  )
}

export default Routers