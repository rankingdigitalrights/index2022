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
        beige: "#F7F4F2",
        prissian: "#1C5275",
        rdr: "#4D9ECF",

        cat: {
          governance: "#57a8d5",
          freedom: "#21bcb3",
          privacy: "#238e88",
          negative: "#e5dcd2",
        },

        diff: {
          add: "#BFAB25",
          del: "#D00000",
        },

        accent: {
          gold: "#ECA400",
          orange: "#F17105",
          pink: "#F17105",
          red: "#ED6A5A",
        },

        disabled: {
          dark: "#D6C9C9",
          default: "#E5DCD2",
          light: "#F7F4F2",
        },
      },
    },
  },
  variants: {},
  plugins: [require("tailwindcss-debug-screens")],
};
