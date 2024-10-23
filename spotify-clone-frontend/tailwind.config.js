/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "1/10": "12%",
        "9/10": "92%",
      },
    },
  },
  variants: {
    fill: ["hover", "focus"], // this line does the trick
  },
  plugins: [],
};
