// src/components/cart/CartFloatingButton.jsx
import { useCart } from "./CartContext";

export default function CartFloatingButton() {
  const { cartItems, openCartSummary, selectedProduct, isSummaryOpen, isCheckoutOpen } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace("$", "")) * item.quantity), 0);

  // Ocultar si no hay items o si algún drawer está abierto en mobile
  const isDrawerOpen = selectedProduct || isSummaryOpen || isCheckoutOpen;
  
  if (cartItems.length === 0 || isDrawerOpen) return null;

  return (
    <button
      onClick={openCartSummary}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-xl z-40"
    >
      🛒 Ver pedido • {totalItems} items • ${totalPrice.toFixed(2)}
    </button>
  );
}