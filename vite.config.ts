
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Using dynamic import for ESM compatibility
    mode === 'development' && {
      name: 'lovable-tagger',
      apply: 'serve',
      enforce: 'post',
      // Empty transform hook to avoid ESM loading issues
      transform(code, id) {
        return code;
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
