import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "vast-dingo-slightly.ngrok-free.app", // Adicione a URL do seu ngrok aqui
    ],
  },
  base: "/", // mantém as rotas funcionando corretamente
});
