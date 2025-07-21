import React, { useState } from 'react'
import { registerUser } from '../firebaseAuth'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerUser(email, password)
      alert('Registration successful! You can now log in.')
      setEmail('')
      setPassword('')
    } catch (error) {
      alert('Error registering: ' + (error as Error).message)
    }
  }

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
      <button type="submit">Register</button>
    </form>
  )
}

export default Register
