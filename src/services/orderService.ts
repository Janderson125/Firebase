// src/services/orderService.ts
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

const ordersRef = collection(db, "orders");

export async function createOrder(userId: string, products: any[], totalPrice: number) {
  return await addDoc(ordersRef, {
    userId,
    products,
    totalPrice,
    createdAt: Timestamp.now(),
  });
}

export async function getUserOrders(userId: string) {
  const q = query(
    ordersRef,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
