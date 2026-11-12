import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import AddProductForm from "./AddProductForm";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

function Market() {
  const { cart, addToCart, search } = useContext(ProductContext);

  const [products, setProducts] = useState([]);

  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  function handleAddProduct(newProduct) {
    setAddedProducts((previousProducts) => [
      ...previousProducts,
      {
        ...newProduct,
        id: newProduct.id ?? Date.now(),
      },
    ]);
  }

  // Update product price
  // function handleUpdatePrice(id, newPrice) {
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === id ? { ...product, price: newPrice } : product,
  //     ),
  //   );
  // }

  function handleUpdatePrice(id, data) {
    fetch(`http://localhost:4000/products/${id}`, {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedProducts = products.map((product) => {
          if (product.id === data.id) {
            product.price = data.price;
          }
          return product;
        });

        setProducts([...updatedProducts]);
      });
  }

  //Deleting a Product
  function handleDelete(id) {
    fetch(`http://localhost:4000/products/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredProducts = products.filter(
          (product) => product.id !== data.id,
        );
        setProducts([...filteredProducts]);
      });
  }

  const allProducts = [...products, ...addedProducts];

  const filteredProducts = allProducts.filter((product) => {
    const searchTerm = search?.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  });

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <section
      className="row g-3 align-items-stretch"
      aria-labelledby="products-heading"
    >
      <div className="col-12">
        <AddProductForm onAddProduct={handleAddProduct} />
      </div>

      <div className="col-12 d-flex justify-content-between align-items-center mb-3">
        <h2 id="products-heading" className="h2 mb-0">
          Laptops
        </h2>

        {cart.length > 0 && (
          <div className="badge bg-success fs-6 p-2">
            Cart: {cart.length} item(s) — Total: ${cartTotal}
          </div>
        )}
      </div>

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-5" key={product.id}>
            <ProductCard
              product={product}
              onUpdatePrice={handleUpdatePrice}
              onDelete={handleDelete}
            />

            <button
              type="button"
              className="btn btn-primary mt-2 w-100"
              onClick={() => addToCart(product)}
              disabled={!product.isAvailable}
            >
              {product.isAvailable
                ? `Add to cart — $${product.price}`
                : "Out of stock"}
            </button>
          </div>
        ))
      ) : (
        <div className="col-12 text-center py-5">
          <h2 className="mt-3">No products found</h2>
        </div>
      )}
    </section>
  );
}

export default Market;
