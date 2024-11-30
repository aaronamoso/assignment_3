import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const sortProducts = (order) => {
    const sorted = [...products].sort((a, b) => // this creates a new arr
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setProducts(sorted);
    setSortOrder(order);
  };

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div>
      <h1>Product List</h1>
      <div className="controls">
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <button onClick={() => sortProducts("asc")}>
          Sort by Price: Low to High
        </button>
        <button onClick={() => sortProducts("desc")}>
          Sort by Price: High to Low
        </button>
      </div>
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
