// src/pages/CartPage.tsx
import { useState } from "react";
import { createOrder } from "../services/orderService";
import { auth } from "../firebase";
import "./CartPage.css";  // import the CSS file

export default function CartPage() {
  const [cart, setCart] = useState([
    { name: "Example Product", price: 10 },
    { name: "Another Product", price: 15 },
  ]);

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to place an order");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const total = cart.reduce((sum, p) => sum + p.price, 0);

    try {
      await createOrder(user.uid, cart, total);
      alert("Order placed successfully!");
      setCart([]); // clear cart
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((p, index) => (
              <li key={index}>
                {p.name} - ${p.price}
              </li>
            ))}
          </ul>
          <p className="cart-total">
            Total: ${cart.reduce((sum, p) => sum + p.price, 0)}
          </p>
          <button className="place-order-btn" onClick={handleCheckout}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
