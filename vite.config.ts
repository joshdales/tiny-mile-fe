import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
import postcssNested from 'postcss-nested'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]',
    },
    postcss: {
      plugins: [autoprefixer(), postcssNested],
    },
  },
})
