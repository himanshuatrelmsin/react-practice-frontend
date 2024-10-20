/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to your template files
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#5100ff",
          "primary-content": "#E0E1DF",
          "secondary": "#669100",
          "secondary-content": "#040700",
          "accent": "#0080ff",
          "accent-content": "#000616",
          "neutral": "#09222f",
          "neutral-content": "#ffffff",
          "base-100": "#fff7f3",
          "base-200": "#ded7d3",
          "base-300": "#beb7b4",
          "base-content": "#000000",
          "info": "#00e6ff",
          "info-content": "#001316",
          "success": "#009c65",
          "success-content": "#000903",
          "warning": "#ffbc00",
          "warning-content": "#160d00",
          "error": "#c41848",
          "error-content": "#fad6d8",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
}
