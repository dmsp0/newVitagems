/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
            "./src/styles/tailwind.css",
  ],
  theme: {
    extend: {
      colors: {
      'vitagems-navy': '#202b4a',  // #202b4a vitagems 남색
    },
  },
  },
  plugins: [],
}
