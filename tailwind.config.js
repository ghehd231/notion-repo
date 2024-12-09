/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sofia-sans)"],
        secondary: ["var(--font-pretendard)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
    screens: {
      xs: "768px",
      sm: "1024px",
      md: "1200px",
      lg: "1440px",
      xl: "1920px",
    },
  },
  darkMode: "selector",
  plugins: [
    // Initialize with default values (see options below)
    require("tailwindcss-radix")({
      // Default: `radix`
      variantPrefix: "rdx",
    }),
  ],
};
