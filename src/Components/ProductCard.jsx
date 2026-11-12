import { useState } from "react";

function ProductCard({ product, onUpdatePrice, onDelete }) {
  const { id, name, image, description, price, isAvailable } = product;

  const [newPrice, setNewPrice] = useState(price);

  function handleUpdatePrice() {
    const updatedPrice = Number(newPrice);

    if (
      newPrice === "" ||
      updatedPrice <= 0 ||
      !Number.isFinite(updatedPrice)
    ) {
      alert("Please enter a valid price.");
      return;
    }

    onUpdatePrice(id, { price: updatedPrice });
  }

  return (
    <article className="h-100 d-flex flex-column border rounded p-3">
      <img
        src={image}
        alt={name}
        className="img-fluid rounded mb-2"
        loading="lazy"
      />

      <h3 className="h5 mb-1">{name}</h3>

      <p className="text-muted small flex-grow-1 mb-2">{description}</p>

      <p className="fw-bold mb-2">${price}</p>

      {!isAvailable && (
        <span className="badge bg-secondary mb-2 align-self-start">
          Out of stock
        </span>
      )}

      {/* Update Price */}
      <div className="mb-2">
        <label className="form-label small">Update Price ($)</label>

        <input
          type="number"
          className="form-control"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          min="0.01"
          step="0.01"
        />
      </div>

      <button
        className="btn btn-primary btn-sm mb-2"
        onClick={handleUpdatePrice}
      >
        Update Price
      </button>

      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => onDelete(id)}
      >
        Delete Product
      </button>
    </article>
  );
}

export default ProductCard;
