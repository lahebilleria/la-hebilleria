// src/components/landing/ProductSection.jsx
import { useCart } from "../cart/CartContext";

export default function ProductSection({ title, products, id }) {
  const { setSelectedProduct } = useCart();

  return (
    <section id={id} className="py-12">
      <h2 className="text-2xl font-bold mb-4 px-6">{title}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 py-12 px-4">
        {products.map((product, i) => (
          <figure
            key={i}
            onClick={() => {
              console.log("🧩 Producto clickeado:", product);
              // 👇 NUEVO: Agregar la categoría al producto
              setSelectedProduct({
                ...product,
                category: title  // "Artesanal", "Colitas Lycra", etc.
              });
            }}
            
            className="relative cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            {/* Imagen */}
            <div className="w-full bg-gray-50">
              <img
                src={product.image.src}
                alt={product.title}
                loading="lazy"
                className="w-full h-64 object-contain p-4"
              />
            </div>

            {/* Info del producto */}
            <div className="px-5 pt-2 pb-5 space-y-1 flex flex-col flex-grow">
              {/* Título */}
              <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 h-11">
                {product.title}
              </h3>

              {/* Spacer para empujar el resto al fondo */}
              <div className="flex-grow"></div>

              {/* Viene en */}
              {product.presentation && (
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Viene en:</span> {product.presentation}
                </p>
              )}

              {/* Precio */}
              <p className="text-lg font-bold text-orange-600 pt-2">
                Precio: {product.price}
              </p>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}