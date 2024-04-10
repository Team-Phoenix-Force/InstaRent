/** @type {import('tailwindcss').Config} */

import keepPreset from "keep-react/src/keep-preset.js";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [keepPreset],
  theme: {
    extend: {
      colors: {
        custom_primary: "#7E22CE",
        secondary: "#ffac38",
        textcolor: "#444",
        grad: "linear-gradient(#474fa0,#7d82bb)",
      },
    },
    plugins: [],
  },
};
