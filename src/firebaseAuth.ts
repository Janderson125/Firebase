// src/firebaseAuth.ts
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const auth = getAuth();

export const registerUser = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);
export const loginUser = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const logoutUser = () => signOut(auth);
export default auth;