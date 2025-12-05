import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente baseadas no modo (development/production)
  // Use '.' instead of process.cwd() para evitar erros de tipo no Vercel
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Define process.env para evitar crash em bibliotecas que esperam Node.js
      'process.env': JSON.stringify(env),
      // Garante que a chave API seja injetada se existir
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Evita falha se o typescript reclamar de algo pequeno durante o build
      commonjsOptions: {
        transformMixedEsModules: true,
      }
    }
  };
});