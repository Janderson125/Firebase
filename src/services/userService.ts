// src/services/userService.ts
import { db } from "../firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const usersRef = (uid: string) => doc(db, "users", uid);

export async function createUser(uid: string, data: any) {
  return await setDoc(usersRef(uid), data);
}

export async function getUser(uid: string) {
  const docSnap = await getDoc(usersRef(uid));
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export async function updateUser(uid: string, data: any) {
  return await updateDoc(usersRef(uid), data);
}

export async function deleteUser(uid: string) {
  return await deleteDoc(usersRef(uid));
}
