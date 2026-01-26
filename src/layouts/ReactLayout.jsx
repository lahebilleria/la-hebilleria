// src/layouts/ReactLayout.jsx
import { CartProvider } from "../components/cart/CartContext.jsx";
import ProductDrawer from "../components/cart/ProductDrawer.jsx";
import CartSummaryDrawer from "../components/cart/CartSummaryDrawer.jsx";
import CheckoutDrawer from "../components/cart/CheckoutDrawer.jsx";
import CartFloatingButton from "../components/cart/CartFloatingButton.jsx";
import ProductSection from "../components/landing/ProductSection.jsx";
import Offers from "../components/landing/Offers.jsx";
import ExhibidoresSection from "../components/landing/ExhibidoresSection.jsx"; // 👈 NUEVO


// Importar categorías individuales
import { artesanal, broches, colitas, hebillas, irrompibles, vinchas } from "../data/products.js";

export default function ReactLayout({ children = null }) {
  // 👇 ORDEN MANUAL DE CATEGORÍAS
  const categories = [
    { name: "Artesanal", id: "artesanal", products: artesanal },
    { name: "Broches", id: "broches", products: broches },
    { name: "Colitas", id: "colitas", products: colitas },
    { name: "Hebillas", id: "hebillas", products: hebillas },
    { name: "Irrompibles", id: "irrompibles", products: irrompibles },
    { name: "Vinchas", id: "vinchas", products: vinchas },
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

      {/* 👇 NUEVA SECCIÓN DE EXHIBIDORES */}
      {/* <ExhibidoresSection />*/}

      
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