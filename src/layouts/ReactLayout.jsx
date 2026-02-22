// src/layouts/ReactLayout.jsx
import { CartProvider } from "../components/cart/CartContext.jsx";
import ProductDrawer from "../components/cart/ProductDrawer.jsx";
import CartSummaryDrawer from "../components/cart/CartSummaryDrawer.jsx";
import CheckoutDrawer from "../components/cart/CheckoutDrawer.jsx";
import CartFloatingButton from "../components/cart/CartFloatingButton.jsx";
import ProductSection from "../components/landing/ProductSection.jsx";
import Offers from "../components/landing/Offers.jsx";

// 👇 IMPORTAR NUEVAS CATEGORÍAS
import { 
  artesanal, 
  irrompibles, 
  colitaslycra, 
  brochesplastico, 
  colitasinfantil, 
  vinchasinfantil, 
  hebillas, 
  setinfantil 
} from "../data/products.js";

export default function ReactLayout({ children = null }) {
  // 👇 NUEVO ORDEN CON NOMBRES ACTUALIZADOS
  const categories = [
    { name: "Artesanal", id: "artesanal", products: artesanal },
    { name: "Colitas Lycra", id: "colitaslycra", products: colitaslycra },
    { name: "Colitas Infantil", id: "colitasinfantil", products: colitasinfantil },
    { name: "Vinchas Infantil", id: "vinchasinfantil", products: vinchasinfantil },
    { name: "Hebillas", id: "hebillas", products: hebillas },
    { name: "Broches Plástico", id: "brochesplastico", products: brochesplastico },
    { name: "Set Infantil", id: "setinfantil", products: setinfantil },
    { name: "Irrompibles", id: "irrompibles", products: irrompibles },
  ];

  return (
    <CartProvider>
      <ProductDrawer />
      <CartSummaryDrawer />
      <CheckoutDrawer />
      <CartFloatingButton />
      
      {/* Primera categoría */}
      {categories[0] && (
        <ProductSection 
          title={categories[0].name} 
          products={categories[0].products} 
          id={categories[0].id} 
        />
      )}
      
      {/* Ofertas (siempre después de la primera categoría) */}
      <Offers />
      
      {/* Resto de categorías */}
      {categories.slice(1).map(category => (
        <ProductSection 
          key={category.id}
          title={category.name} 
          products={category.products} 
          id={category.id} 
        />
      ))}
      
      {children}
    </CartProvider>
  );
}