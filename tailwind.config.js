/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 ডার্ক মোড অন করার মেইন লজিক
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};