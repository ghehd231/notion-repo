/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    screens: {
      xs: "768px",
      sm: "1024px",
      md: "1200px",
      lg: "1440px",
      xl: "1920px",
    },
  },
  plugins: [],
};
