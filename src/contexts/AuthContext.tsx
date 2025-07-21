import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from 'firebase/auth'
import { onAuthStateChangedListener } from '../firebaseAuth'

interface AuthContextProps {
  currentUser: User | null
}

export const AuthContext = createContext<AuthContextProps>({ currentUser: null })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      setCurrentUser(user)
    })
    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
