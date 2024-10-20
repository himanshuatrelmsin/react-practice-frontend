import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure the output directory is 'dist'
    sourcemap: true, // Optional: Helpful for debugging
  },
})
