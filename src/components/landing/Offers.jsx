// src/components/landing/Offers.jsx
import { useCart } from "../cart/CartContext";
import p1 from "@/images/Combo Plastico.webp";
import p2 from "@/images/Combo Escolar.webp";
import p3 from "@/images/Combo Otoñal.webp";

const ofertasDestacadas = [
  { 
    title: "Plástico Irrompible", 
    subtitle: "Combo Variado", 
    price: "$22000",
    originalPrice: "$24800", 
    discount: "10% OFF",
    image: p1 
  },
  { 
    title: "Mix Escolar", 
    subtitle: "Edición limitada", 
    price: "$17000",
    originalPrice: "$19400", 
    discount: "10% OFF",
    image: p2 
  },
  { 
    title: "Combo Otoñal", 
    subtitle: "Pack completo", 
    price: "$22000",
    originalPrice: "$24800", 
    discount: "10% OFF",
    image: p3 
  },
];

export default function Offers() {
  const { setSelectedProduct } = useCart();

  return (
    <section id="ofertas" className="py-12 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
          🔥 Ofertas Especiales
        </h2>
        <p className="text-gray-600">Aprovechá estos descuentos por tiempo limitado</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 px-6">
        {ofertasDestacadas.map((product, i) => (
          <figure
            key={i}
            onClick={() => setSelectedProduct(product)}
            className="relative cursor-pointer bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
          >
            {/* Badge de descuento */}
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
              {product.discount}
            </div>

            <img
              src={product.image.src}
              alt={product.title}
              className="w-full h-48 rounded-xl object-contain"
            />
            
            <div className="mt-4">
              <h3 className="font-bold text-lg text-gray-900">{product.title}</h3>
              <p className="text-sm text-gray-500">{product.subtitle}</p>
              
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xl font-bold text-orange-600">{product.price}</span>
                <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
              </div>
            </div>
          </figure>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          * Ofertas válidas hasta agotar stock. Consultá disponibilidad por WhatsApp.
        </p>
      </div>
    </section>
  );
}