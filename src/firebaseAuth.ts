import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth'
import app from './firebase'

const auth = getAuth(app)

// Register new user
export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

// Login user
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

// Logout user
export const logoutUser = () =>
  signOut(auth)

// Listen for auth state changes
export const onAuthStateChangedListener = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback)

export default auth
