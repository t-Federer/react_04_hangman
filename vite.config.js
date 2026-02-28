import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? '/react_04_hangman/' : '/',
    plugins: [
      react(),
    ],
  }
})

