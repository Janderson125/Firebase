import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Logout from './Logout'

const NavBar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">Home</Link>
      {!currentUser ? (
        <>
          <Link to="/login" style={{ marginLeft: 10 }}>Login</Link>
          <Link to="/register" style={{ marginLeft: 10 }}>Register</Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: 10 }}>Welcome, {currentUser.email}</span>
          <Logout />
        </>
      )}
    </nav>
  )
}

export default NavBar
