// src/services/productService.ts
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const productsRef = collection(db, "products");

export async function getProducts() {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createProduct(product: any) {
  return await addDoc(productsRef, product);
}

export async function updateProduct(id: string, product: any) {
  const productDoc = doc(db, "products", id);
  return await updateDoc(productDoc, product);
}

export async function deleteProduct(id: string) {
  const productDoc = doc(db, "products", id);
  return await deleteDoc(productDoc);
}
