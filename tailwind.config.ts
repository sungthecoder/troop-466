import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        troop466: {
          "50": "#fff1f0",
          "100": "#ffe0dd",
          "200": "#ffc7c1",
          "300": "#ff9f95",
          "400": "#ff6959",
          "500": "#ff3b26",
          "600": "#fc1e06",
          "700": "#cc1400",
          "800": "#af1605",
          "900": "#90190c",
          "950": "#500800",
        },
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        troop466: {
          primary: "#ff3b26",
          ".btn-primary": {
            text: "white",
          },
        },
      },
    ],
  },
} satisfies Config;
