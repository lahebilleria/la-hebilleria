// src/components/cart/CheckoutDrawer.jsx
import { useCart } from "./CartContext";
import { useState } from "react";

export default function CheckoutDrawer() {
  const { cartItems, isCheckoutOpen, closeCheckout } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    aclaraciones: ""
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.direccion) {
      alert("Por favor completá tu nombre y dirección de envío");
      return;
    }

  // Preparar items para ambos eventos
  const items = cartItems.map(item => ({
    item_id: item.subtitle,           // Código: AC1150
    item_name: item.title,            // Nombre del producto
    price: parseFloat(item.price.replace("$", "").replace(/,/g, "")),
    quantity: item.quantity,
    item_category: item.category || 'Ofertas Especiales'  // 
  }));

  const orderValue = parseFloat(totalPrice.toFixed(2));

  if (typeof window !== 'undefined' && window.dataLayer) {
    // 👇 EVENTO 1: Enhanced Ecommerce Purchase (para GA4)
    window.dataLayer.push({ ecommerce: null }); // Limpiar ecommerce object
    window.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: `WA-${Date.now()}`,   // ID único de transacción
        value: orderValue,
        currency: 'ARS',
        tax: 0,
        shipping: 0,
        items: items
      }
    });

    // 👇 EVENTO 2: Conversión custom para Google Ads
    window.dataLayer.push({
      event: 'whatsapp_order',
      event_category: 'conversion',
      event_label: 'checkout_complete',
      value: orderValue,
      currency: 'ARS',
      transaction_id: `WA-${Date.now()}`,
      items: items
    });
  }
      let mensaje = `Hola, quiero consultar por compra mayorista:\n\n`;
      mensaje += `━━━━━━━━━━━━━━━━━━\n`;
      mensaje += `📦 *DETALLE DEL PEDIDO:*\n\n`;

      cartItems.forEach((item, index) => {
        const subtotal = (parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2);
        mensaje += `${index + 1}. *${item.title}*\n`;
        if (item.subtitle) {
          mensaje += `   Código: ${item.subtitle}\n`;
        }
        mensaje += `   Cantidad: ${item.quantity} × ${item.price} = $${subtotal}\n\n`;
      });

      mensaje += `━━━━━━━━━━━━━━━━━━\n`;
      mensaje += `💰 *SUBTOTAL: $${totalPrice.toFixed(2)}*\n`;
      mensaje += `📍 *Envío: A coordinar*\n\n`;
      
      mensaje += `👤 *DATOS DEL CLIENTE:*\n`;
      mensaje += `Nombre: ${formData.nombre}\n`;
      mensaje += `Dirección: ${formData.direccion}\n`;
      if (formData.aclaraciones) {
        mensaje += `Notas: ${formData.aclaraciones}\n`;
      }

      const mensajeCodificado = encodeURIComponent(mensaje);
      const numeroWhatsApp = "5491168197021";
      
      window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
    };

  return (
    <>
      {/* Overlay solo en mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 lg:hidden z-40" 
        onClick={closeCheckout}
      />
      
      {/* Drawer */}
      <div
        className="fixed right-0 top-0 w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col transform transition-transform duration-300 overflow-y-auto z-50 lg:z-30"
      >
        <button 
          onClick={closeCheckout} 
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
          Volver
        </button>

        <h2 className="text-2xl font-bold mb-6">Completá tus datos</h2>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección de envío *
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Calle 123, Ciudad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aclaraciones (opcional)
            </label>
            <textarea
              name="aclaraciones"
              value={formData.aclaraciones}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Ej: Si hay variantes, elegir al azar. Priorizar colores neutros..."
              rows="3"
            />
          </div>
        </div>

        <div className="border-t pt-4">

           {/* 👇 NUEVO: Aviso de envío */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">📦 Importante:</span> El costo de envío no está incluido y se coordinará por WhatsApp según tu ubicación.
            </p>
          </div>

          <h3 className="font-semibold mb-3">Resumen del pedido:</h3>
          <ul className="space-y-2 mb-4 text-sm">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.title} × {item.quantity}</span>
                <span className="font-medium">
                  ${(parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mb-4 text-orange-600">
            Total: ${totalPrice.toFixed(2)}
          </p>

          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg w-full transition flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Enviar pedido por WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}