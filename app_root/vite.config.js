import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
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
