// src/firebaseServices.js
import { getFirestore, doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, serverTimestamp, query, where } from 'firebase/firestore';

const db = getFirestore();

// User Management
export const createUserDocument = async (user) => {
  if (!user) return;
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    name: "",
    address: ""
  });
};

export const fetchUserData = async (uid) => {
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() };
  }
  return null;
};

export const updateUserProfile = async (uid, data) => {
  await updateDoc(doc(db, 'users', uid), data);
};

export const deleteUserData = async (uid) => {
  await deleteDoc(doc(db, 'users', uid));
};

// Product Management
export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  const products = [];
  snapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};

export const addProduct = async (productData) => {
  await addDoc(collection(db, 'products'), productData);
};

export const updateProduct = async (id, data) => {
  await updateDoc(doc(db, 'products', id), data);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, 'products', id));
};

// Order Management
export const createOrder = async (userId, products, totalPrice) => {
  await addDoc(collection(db, 'orders'), {
    userId,
    products,
    totalPrice,
    createdAt: serverTimestamp()
  });
};

export const fetchOrdersForUser = async (userId) => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  const orders = [];
  snapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
  });
  return orders;
};