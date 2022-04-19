/* eslint global-require: off, @typescript-eslint/no-var-requires: off */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-disabled-light",
    "italic",
    "fill-2017",
    "fill-2018",
    "fill-2019",
    "fill-2020",
    "fill-2022",
    "fill-arrow-white",
    "fill-arrow-blue",
    "fill-arrow-prissian",
    "fill-arrow-turquoise",
    "fill-arrow-yellow",
    "fill-arrow-red",
    "stroke-arrow-white",
    "stroke-arrow-blue",
    "stroke-arrow-prissian",
    "stroke-arrow-turquoise",
    "stroke-arrow-yellow",
    "stroke-arrow-red",
  ],
  theme: {
    extend: {
      transitionDuration: {
        600: "600ms",
      },

      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        serif: ["Source Serif Pro", ...defaultTheme.fontFamily.serif],
      },

      fontSize: {
        xxs: "0.58rem",
        xs: "0.694rem",
        sm: "0.833rem",
        base: "1rem",
        md: "1.2rem",
        lg: "1.44rem",
        xl: "2.5rem",
        xxl: "3.6rem",
      },

      colors: {
        beige: "#F7F4F2",
        prissian: "#1C5275",
        rdr: "#4D9ECF",
        boxprompt: "#E5E7EB",

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
          DEFAULT: "#E5DCD2",
          light: "#F7F4F2",
        },

        light: {
          freedom: "#BCEBE8",
        },

        arrow: {
          prissian: "#1C5275",
          turquoise: "#21BBB2",
          yellow: "#EBA300",
          blue: "#4D9ECF",
          red: "#EC6A5A",
          white: "#FFFFFF",
        },

        2017: "#FFA47C",
        2018: "#F48E64",
        2019: "#DC5F38",
        2020: "#DC5F38",
        2022: "#C2260E",
      },
    },
  },
  variants: {},
};
