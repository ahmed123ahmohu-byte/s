import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/s/',   // 👈 مهم جدًا
  plugins: [react()],
  server: {
    port: 5173
  }
});
