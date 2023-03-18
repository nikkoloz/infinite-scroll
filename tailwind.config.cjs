/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./src/**/*.{js,jsx,ts,tsx}",
 ],
 theme: {
  extend: {
   colors: {
    "main-blue": "#0079FF",
    "main-gray": "#c6cddd",
    "main-gray2": "white",

   },
   screens: {
    'md800': '800px',
   },
  },
 },
 plugins: [],
}
