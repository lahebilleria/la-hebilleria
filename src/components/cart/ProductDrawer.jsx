// src/components/cart/ProductDrawer.jsx
import { useCart } from "./CartContext";
import { useEffect, useState, useRef } from "react";

export default function ProductDrawer() {
  const context = useCart();
  const drawerRef = useRef(null);

  if (!context) {
    console.error("❌ ProductDrawer se está renderizando sin CartProvider.");
    return null;
  }

  const { selectedProduct, setSelectedProduct, addToCart } = context;
  const [quantity, setQuantity] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const parsePrice = (priceString) => {
    return parseInt(priceString.replace(/\D/g, ""));
    };

useEffect(() => {
  if (selectedProduct && typeof window !== 'undefined' && window.dataLayer) {
    // Track cuando se abre el drawer
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: 'view_item',
      ecommerce: {
        items: [{
          item_id: selectedProduct.subtitle,
          item_name: selectedProduct.title,
          item_category: selectedProduct.category || 'Sin categoría',
          price: parsePrice(selectedProduct.price),
          quantity: 1
        }]
      }
    });
  }
  
  setQuantity(1);
  setShowConfirmation(false);
  setIsImageExpanded(false);
}, [selectedProduct]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setSelectedProduct(null);
      }
    };
    if (selectedProduct) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedProduct]);

// src/components/cart/ProductDrawer.jsx

const handleAddToCart = () => {
  // Track add to cart ANTES de agregar
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        items: [{
          item_id: selectedProduct.subtitle,
          item_name: selectedProduct.title,
          item_category: selectedProduct.category || 'Sin categoría',
          price: parsePrice(selectedProduct.price),
          quantity: quantity
        }]
      }
    });
  }

  addToCart(selectedProduct, quantity);
  setShowConfirmation(true);
  setTimeout(() => {
    setShowConfirmation(false);
    setSelectedProduct(null);
  }, 1000);
};

  if (!selectedProduct) return null;

  const { title, subtitle, presentation, price, minOrder, image } = selectedProduct;
  const unitPrice = parseFloat(price.replace("$", "").replace(/,/g, ""));
  const total = unitPrice * quantity;

  return (
    <aside
      ref={drawerRef}
      className="fixed top-0 right-0 h-screen w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
    >
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-4 left-4 text-gray-700 hover:text-black z-10"
        aria-label="Cerrar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 md:h-8 md:w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto p-6 pt-14 pb-4">
        <div className="flex flex-col gap-4 md:gap-6 max-w-sm mx-auto h-full">
          
          {/* Imagen expandible */}
          <div className="w-full flex-shrink-0 relative">
            <img
              src={image.src}
              alt={title}
              onClick={() => setIsImageExpanded(!isImageExpanded)}
              className={`w-full rounded-xl shadow object-contain cursor-pointer transform transition-all duration-700 ease-in-out ${
                isImageExpanded 
                  ? 'fixed inset-0 m-auto z-50 max-w-2xl h-[80vh] scale-100' 
                  : 'h-48 sm:h-56 md:h-64 lg:h-72 scale-100'
              }`}
            />
            
            {isImageExpanded && (
              <>
                <div 
                  className="fixed inset-0 bg-black transition-opacity duration-700 ease-in-out z-40"
                  style={{ opacity: isImageExpanded ? 0.7 : 0 }}
                  onClick={() => setIsImageExpanded(false)}
                />
                
                <button
                  onClick={() => setIsImageExpanded(false)}
                  className="fixed top-20 right-8 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                  aria-label="Cerrar imagen"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <p className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm bg-black bg-opacity-60 px-4 py-2 rounded-full transition-opacity duration-700">
                  Click para cerrar
                </p>
              </>
            )}
          </div>

          {/* Info del producto */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            
            {/* Código del producto */}
            <div className="bg-gray-100 rounded-lg px-3 py-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Código:</span> {subtitle}
              </p>
            </div>

            {/* Presentación */}
            {presentation && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Viene en:</span> {presentation}
              </p>
            )}

            {/* Precio */}
            <p className="text-lg font-bold text-orange-600">
              Precio: {price}
            </p>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm font-medium">Cantidad:</span>
            <button
              className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded transition"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="font-semibold min-w-[2rem] text-center">{quantity}</span>
            <button
              className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300 rounded transition"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* Precio total */}
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total:</p>
            <p className="text-2xl font-bold text-green-700">${total.toLocaleString('es-AR')}</p>
          </div>
        </div>
      </div>

      {/* Botón fijo */}
      <div className="p-6 pt-4 border-t bg-white flex-shrink-0">
        {showConfirmation && (
          <div className="mb-3 text-center">
            <p className="text-green-600 font-semibold text-sm sm:text-base flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Producto agregado
            </p>
          </div>
        )}
        
        <button
          onClick={handleAddToCart}
          disabled={showConfirmation}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition"
        >
          Agregar al carrito
        </button>
      </div>
    </aside>
  );
}