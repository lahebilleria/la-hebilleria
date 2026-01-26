// src/components/landing/ProductSection.jsx
import { useCart } from "../cart/CartContext";

export default function ProductSection({ title, products, id }) {
  const { setSelectedProduct } = useCart();

  return (
    <section id={id} className="py-12">
      <h2 className="text-2xl font-bold mb-4 px-6">{title}</h2>
      <div className="grid grid-cols-1 gap-6 lg:gap-y-24 md:grid-cols-2 lg:grid-cols-3 py-12">
        {products.map((product, i) => (
          <figure
            key={i}
            onClick={() => {
              console.log("🧩 Producto clickeado:", product);
              setSelectedProduct(product);
            }}
            className="relative cursor-pointer"
          >
            <img
              src={product.image.src}
              alt={product.title}
              className="w-full rounded-3xl shadow aspect-12/9 object-contain object-center"
            />
            <div className="mt-2 flex justify-between px-6">
              <div>
                <h3 className="text-base font-semibold text-base-900">{product.title}</h3>
                <p className="mt-0.5 text-sm text-base-500">{product.subtitle}</p>
              </div>
              <p className="text-lg font-semibold text-orange-600">{product.price}</p>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}