// src/components/landing/ExhibidoresSection.jsx
import { useState } from "react";
import { useCart } from "../cart/CartContext"; // 👈 AGREGAR

const exhibidores = [
  {
    id: "corto",
    nombre: "Exhibidor Corto",
    descripcion: "Exhibidor de dos niveles, ideal para estantes cercanos a la caja",
    niveles: "2 niveles",
    productos: "+50 productos incluidos",
    ubicacion: "Mostrador o estante",
    medidas: "40cm alto × 30cm ancho",
    precio: "$15000", // 👈 AGREGAR (o dejalo vacío si no querés mostrar precio)
    imagen: "/exhibidor-10-ok.avif",// Reemplaza con tu ruta
    imagenDetalle: "/exhibidor-acortado-ok.avif",
    beneficios: [
      "Maximiza espacio en caja",
      "Productos a la vista del cliente",
      "Fácil reposición",
      "Estructura resistente incluida"
    ],
    contenido: [
      "20 colitas surtidas",
      "15 vinchas variadas",
      "10 scrunchies",
      "5 packs de hebillas"
    ]
  },
  {
    id: "largo",
    nombre: "Exhibidor Largo",
    descripcion: "De hasta 4 niveles, ideal para colocar en el piso o sobre escalón",
    niveles: "3 a 4 niveles",
    productos: "+100 productos incluidos",
    ubicacion: "Piso o escalón",
    medidas: "150cm alto × 40cm ancho",
    precio: "$28000", // 👈 AGREGAR
    imagen: "/exhibidor-largo-detalle.avif",
    imagenDetalle: "/exhibidor-largo-pelado-a.avif",
    beneficios: [
      "Máxima capacidad de exhibición",
      "Gran impacto visual",
      "Rotación constante de productos",
      "Inversión recuperable rápidamente"
    ],
    contenido: [
      "40 colitas surtidas",
      "30 vinchas variadas",
      "20 scrunchies",
      "10 packs de hebillas",
      "10 accesorios varios"
    ]
  }
];

export default function ExhibidoresSection() {
  const [selectedExhibidor, setSelectedExhibidor] = useState(null);
  const { setSelectedProduct, addToCart } = useCart(); // 👈 AGREGAR useCart
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);

  const handleWhatsApp = (exhibidor) => {
    const mensaje = `Hola! Me interesa el *${exhibidor.nombre}*.\n\n` +
                   `Quisiera consultar:\n` +
                   `- Precio del pack completo\n` +
                   `- Productos incluidos\n` +
                   `- Opciones de personalización\n` +
                   `- Costo de envío\n\n` +
                   `Gracias!`;
    
    const numeroWhatsApp = "549XXXXXXXXXX"; // 👈 Tu número
    const mensajeCodificado = encodeURIComponent(mensaje);
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, "_blank");
  };

  const handleAddToCart = (exhibidor) => {
    // Convertir exhibidor a formato de producto
    const productoParaCarrito = {
      title: exhibidor.nombre,
      subtitle: exhibidor.descripcion,
      price: exhibidor.precio || "Consultar",
      image: { src: exhibidor.imagen }
    };
    
    addToCart(productoParaCarrito, 1);
    
    // Mostrar confirmación
    setShowAddedConfirmation(true);
    setTimeout(() => {
      setShowAddedConfirmation(false);
      setSelectedExhibidor(null); // Cerrar modal
    }, 1500);
  };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl my-12">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
              🏆 Combo Exhibidor
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Exhibidores Completos
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprás el exhibidor + todos los productos incluidos.<br />
              <strong>
              Armado simple, impacto inmediato
              </strong>
            </p>
          </div>

          {/* Cards de Exhibidores */}
          <div className="grid md:grid-cols-2 gap-8">
            {exhibidores.map((exhibidor) => (
              <div
                key={exhibidor.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Imagen */}
                <div className="relative h-80 bg-gray-100">
                  <img
                    src={exhibidor.imagen}
                    alt={exhibidor.nombre}
                    className="w-full h-full object-contain p-2" // 👈 object-contain + padding
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ✓ Productos incluidos
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {exhibidor.nombre}
                  </h3>
                  <p className="text-gray-600 mb-4">{exhibidor.descripcion}</p>

                  {/* Características rápidas */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">📏</span>
                      <span className="font-semibold">{exhibidor.niveles}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">📦</span>
                      <span className="font-semibold">{exhibidor.productos}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">📍</span>
                      <span className="font-semibold">{exhibidor.ubicacion}</span>
                    </div>
                    {exhibidor.precio && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-blue-600">💰</span>
                        <span className="font-bold text-lg text-orange-600">{exhibidor.precio}</span>
                      </div>
                    )}
                  </div>

                  {/* Botón ver detalles */}
                  <button
                    onClick={() => setSelectedExhibidor(exhibidor)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    Ver detalles completos
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nota de envío */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              * Envío a coordinar por WhatsApp • Precios sujetos a disponibilidad
            </p>
          </div>
        </div>
      </section>

      {/* Modal de Detalles */}
      {selectedExhibidor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExhibidor(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              {/* Header del modal */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedExhibidor.nombre}
                  </h3>
                  <p className="text-gray-600">{selectedExhibidor.descripcion}</p>
                  {selectedExhibidor.precio && (
                    <p className="text-2xl font-bold text-orange-600 mt-2">
                      {selectedExhibidor.precio}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedExhibidor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Imagen detalle */}
              <img
                src={selectedExhibidor.imagenDetalle || selectedExhibidor.imagen}
                alt={selectedExhibidor.nombre}
                 className="w-full h-96 object-contain rounded-xl mb-6 p-4" // 👈 object-contain + padding
              />

              {/* Beneficios */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3">✨ Beneficios:</h4>
                <ul className="space-y-2">
                  {selectedExhibidor.beneficios.map((beneficio, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contenido incluido */}
              <div className="mb-6">
                <h4 className="font-bold text-lg mb-3">📦 Productos incluidos:</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {selectedExhibidor.contenido.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-blue-600">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Especificaciones */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-lg mb-3">📐 Especificaciones:</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Niveles:</span>
                    <p className="font-semibold">{selectedExhibidor.niveles}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Medidas:</span>
                    <p className="font-semibold">{selectedExhibidor.medidas}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Productos:</span>
                    <p className="font-semibold">{selectedExhibidor.productos}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Ubicación ideal:</span>
                    <p className="font-semibold">{selectedExhibidor.ubicacion}</p>
                  </div>
                </div>
              </div>

              {/* Confirmación de agregado */}
              {showAddedConfirmation && (
                <div className="mb-4 bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    ¡Exhibidor agregado al carrito!
                  </p>
                </div>
              )}

              {/* CTAs - Ambas opciones */}
              <div className="space-y-3">
                <button
                  onClick={() => handleAddToCart(selectedExhibidor)}
                  disabled={showAddedConfirmation}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Agregar al carrito
                </button>

                <button
                  onClick={() => handleWhatsApp(selectedExhibidor)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Consultar personalización y envío
                </button>

                <p className="text-xs text-center text-gray-500 mt-2">
                  Podés agregar al carrito y seguir comprando otros productos
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
