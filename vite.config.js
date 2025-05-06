import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@assets' :path.resolve(__dirname,'./src/assets'),
      '@components' :path.resolve(__dirname,'./src/components'),
      '@core' :path.resolve(__dirname,'./src/core'),
      '@contexts' :path.resolve(__dirname,'./src/contexts')
    }
  }
  ,
  plugins: [react(),
    tailwindcss(),
  ],
})
