import React, { useState, useContext } from 'react'
import { loginUser } from '../firebaseAuth'
import { AuthContext } from '../contexts/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { currentUser } = useContext(AuthContext)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginUser(email, password)
      alert('Login successful!')
      setEmail('')
      setPassword('')
    } catch (error) {
      alert('Error logging in: ' + (error as Error).message)
    }
  }

  if (currentUser) return <p>Welcome, {currentUser.email}</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
