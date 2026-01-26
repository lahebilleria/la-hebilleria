// src/components/landing/Wholesalebadge.jsx
import React from "react";

const WholesaleBadge = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 lg:z-20 space-y-2"
    >
      <div className="bg-yellow-400 text-black px-6 py-3 font-bold shadow-xl text-sm md:text-base clip-star text-center uppercase tracking-wider">
        SÓLO VENTA POR MAYOR
      </div>
      <div className="bg-yellow-400 text-black px-6 py-3 font-bold shadow-xl text-sm md:text-base clip-star text-center uppercase tracking-wider">
        COMPRA MÍNIMA $20.000
      </div>
    </div>
  );
};

export default WholesaleBadge;