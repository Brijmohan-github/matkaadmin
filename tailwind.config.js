/** @type {import('tailwindcss').Config} */
export const lightColors = {
  primary: "#3787FF",
  primaryDark: "#263238",
  secondary: "#ffed4a",
  accent: "#ff6384",
};

export const darkColors = {
  primary: "#3787FF",
  secondary: "#ffed4a",
  accent: "#ff6384",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
        900: "900",
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: "Inter, sans-serif",
      },
      colors: {
        primary: lightColors.primary,
        secondary: lightColors.secondary,
        accent: lightColors.accent,
        primaryDark: lightColors.primaryDark,
      },
    },
  },
  plugins: [],
};
