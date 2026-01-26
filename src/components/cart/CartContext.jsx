// src/components/cart/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false); // 👈 NUEVO

  const openCartSummary = () => setIsSummaryOpen(true);
  const closeCartSummary = () => setIsSummaryOpen(false);
  
  const openCheckout = () => {
    setIsSummaryOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addToCart = (product, quantity) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productTitle) => {
    setCartItems((prev) => prev.filter((item) => item.title !== productTitle));
  };

  return (
    <CartContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        cartItems,
        addToCart,
        removeFromCart,
        isSummaryOpen,
        openCartSummary,
        closeCartSummary,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);