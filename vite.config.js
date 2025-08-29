import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 8080,
    host: true, // expose to network
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        registration: resolve(__dirname, "registration.html"),
        webRoom: resolve(__dirname, "webRoom.html"),
      }
    }
  }
});
