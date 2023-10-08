// import { type Config } from "tailwindcss";

import {nextui} from "@nextui-org/react";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;


// } satisfies Config;
