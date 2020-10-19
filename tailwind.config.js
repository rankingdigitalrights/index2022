/* eslint global-require: off */

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "simplon-light": ["Simplon-Light", "sans-serif"],
        "simplon-bold": ["Simplon-Bold", "sans-serif"],
      },
      colors: {
        "accent-1": "#333",
        "medium-gray": "#6d6f71",
        "offset-gray": "#f7f7f7",
        governance: "#57a8d5",
        freedom: "#21bcb3",
        privacy: "#238e88",
        "vis-negative": "#e5dcd2",
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-debug-screens")],
};
