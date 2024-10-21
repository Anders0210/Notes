/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGray: "#f6f5f5",
        darkGray: "#e8e8e8",
        dark: "#212121",
        moreDark: "#171717",
      },
    },
  },
  plugins: [],
};
