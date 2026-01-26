/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // Aquí podés personalizar colores, fuentes, clip-path, etc.
      clipPath: {
        star: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
      },
      colors: {
        brandYellow: '#FFD700',
      },
    },
  },
  plugins: [],
}
