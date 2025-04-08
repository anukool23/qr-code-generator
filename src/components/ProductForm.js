import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    weight: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        name: formData.name,
        sku: formData.sku,
        weight: parseInt(formData.weight)
      });
      alert("Product added successfully!");
      setFormData({ name: "", sku: "", weight: "" });
    } catch (error) {
      console.error("Error adding product: ", error);
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Product</h2>
      <div>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>SKU:</label>
        <input name="sku" value={formData.sku} onChange={handleChange} required />
      </div>
      <div>
        <label>Weight:</label>
        <input name="weight" type="number" value={formData.weight} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
