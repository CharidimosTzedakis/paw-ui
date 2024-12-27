import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  css: { ...viteConfig.css },
  resolve: { ...viteConfig.resolve },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    include: ["./src/**/*.{test.ts,test.tsx}"],
    exclude: ["node_modules"],
  },
});
