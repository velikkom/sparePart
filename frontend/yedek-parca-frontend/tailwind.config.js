/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Eğer Next.js kullanıyorsan
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.css", // Hata mesajında önerilen düzeltme
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};