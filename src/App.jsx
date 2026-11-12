import { useState } from "react";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";
import Market from "./Components/Market";
import Footer from "./Components/Footer";
import CartDrawer from "./Components/CartDrawer";
import Features from "./Components/Features";
import Highlights from "./Components/Highlights";

import { ProductContext } from "./context/ProductContext";
import { CartContext } from "./context/CartContext";

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <ProductContext.Provider value={{ cart, addToCart, search, setSearch }}>
      <CartContext.Provider value={{ cart, removeFromCart }}>
        <header className="app-header py-3 py-md-4">
          <NavBar
            cart={cart}
            onOpenCart={() => setIsCartOpen(true)}
            search={search}
            setSearch={setSearch}
          />
        </header>

        <main className="container app-main">
          <Hero />
          <Market cart={cart} addToCart={addToCart} search={search} />
          <Highlights />
        </main>

        <footer className="mt-4">
          <Footer />
        </footer>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
