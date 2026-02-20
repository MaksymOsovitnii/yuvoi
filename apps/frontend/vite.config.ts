import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $modules: path.resolve("./src/modules"),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: [],
  },
  optimizeDeps: {
    include: ["bits-ui"],
  },
  ssr: {
    noExternal: ["bits-ui"],
  },
});
