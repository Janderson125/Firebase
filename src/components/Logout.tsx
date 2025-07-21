import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { logoutUser } from '../firebaseAuth'

const Logout = () => {
  const { currentUser } = useContext(AuthContext)

  if (!currentUser) return null

  const handleLogout = async () => {
    try {
      await logoutUser()
      alert('Logged out successfully.')
    } catch (error) {
      alert('Error logging out: ' + (error as Error).message)
    }
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default Logout
