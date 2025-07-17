// src/firebaseFirestore.ts
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const db = getFirestore();

export const addUserProfile = async (userId: string, data: any) => {
  await addDoc(collection(db, 'users'), { userId, ...data });
};

export const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (product: any) => {
  await addDoc(collection(db, 'products'), product);
};

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(collection(db, 'products'), id));
};

export const updateProduct = async (id: string, data: any) => {
  await updateDoc(doc(collection(db, 'products'), id), data);
};

export const addOrder = async (order: any) => {
  await addDoc(collection(db, 'orders'), order);
};

export const fetchOrdersByUser = async (userId: string) => {
  const snapshot = await getDocs(collection(db, 'orders'));
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(order => order.userId === userId);
};