// src/components/cart/CartSummaryDrawer.jsx
import { useCart } from "./CartContext";

export default function CartSummaryDrawer() {
  const { cartItems, isSummaryOpen, closeCartSummary, openCheckout, removeFromCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + (parseFloat(item.price.replace("$", "")) * item.quantity), 0);

  if (!isSummaryOpen) return null;

  return (
    <>
      {/* Overlay solo en mobile - bloquea interacción */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-40" 
        onClick={closeCartSummary}
      />
      
      {/* Drawer - z-index bajo en desktop para permitir clicks fuera */}
      <div
        className="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300 z-50 lg:z-30"
      >
        <button 
          onClick={closeCartSummary} 
          className="mb-4 text-gray-500 hover:text-black self-start flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Cerrar
        </button>

        <h2 className="text-2xl font-bold mb-4">Resumen del pedido</h2>

        <ul className="space-y-4 flex-1 overflow-auto">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between items-start gap-4 border-b pb-3">
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {item.price} × {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-orange-600">
                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.title)}
                  className="text-xs text-red-500 hover:text-red-700 mt-1"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="border-t pt-4 mt-4">
          <p className="text-xl font-bold mb-4">Total: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={openCheckout}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg w-full transition"
          >
            Iniciar compra
          </button>
        </div>
      </div>
    </>
  );
}