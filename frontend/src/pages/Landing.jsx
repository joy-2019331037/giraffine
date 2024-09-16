import React from 'react'
import { Link } from 'react-router-dom'

const Root = () => {
  return <>
  <Link to="/register">Register</Link>
  <br></br>
  <Link to="/login">Login</Link>
  </>
}

export default Root;