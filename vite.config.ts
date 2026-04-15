import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const { VITE_BASE_URL } = loadEnv(process.env.NODE_ENV!, process.cwd(), '');

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: VITE_BASE_URL ?? '/',
});
