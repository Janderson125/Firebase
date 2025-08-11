// src/pages/OrderHistoryPage.tsx
import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderService";
import { auth } from "../firebase";
import "./OrderHistoryPage.css";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      loadOrders(user.uid);
    }
  }, []);

  const loadOrders = async (userId: string) => {
    const data = await getUserOrders(userId);
    setOrders(data);
  };

  return (
    <div className="order-history-container">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <strong>Date:</strong>{" "}
              {order.createdAt?.seconds
                ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                : "No date"}{" "}
              <br />
              <strong>Total Price:</strong> ${order.totalPrice}
              <br />
              <strong>Products:</strong>
              <ul className="order-products-list">
                {order.products.map((p: any, index: number) => (
                  <li key={index}>
                    {p.name} - ${p.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
