import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.jsx'),
      name: 'VetChatbot',
      fileName: () => 'chatbot.js',
      formats: ['iife']
    },
    cssCodeSplit: false, // Bundle CSS into the JS (Vite usually does this for lib mode if configured right, or puts it in style.css)
    rollupOptions: {
      output: {
        // For IIFE, we want to extend the window object or just run.
        // But we also want to ensure no conflicts.
        extend: true,
      }
    }
  },
  define: {
    'process.env': {} // Polyfill process.env for some libs if needed
  }
})
