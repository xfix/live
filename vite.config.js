import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/live/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        edit: resolve(__dirname, "edit.html"),
      },
    },
  },
});
