// src/pages/ProductsPage.tsx
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import "./ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price) return alert("Fill all fields");
    await createProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
    });
    setNewProduct({ name: "", price: "" });
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleUpdate = async (id: string) => {
    const updatedName = prompt("Enter new product name:");
    const updatedPrice = prompt("Enter new product price:");
    if (updatedName && updatedPrice) {
      await updateProduct(id, {
        name: updatedName,
        price: parseFloat(updatedPrice),
      });
      loadProducts();
    }
  };

  return (
    <div className="products-container">
      <h1>Product Management</h1>

      <div className="add-product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <ul>
        {products.map((p) => (
          <li key={p.id} className="product-item">
            {p.name} - ${p.price}
            <button onClick={() => handleUpdate(p.id)}>Edit</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
