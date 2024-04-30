// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///home/kagwe/projects/Art-Room/node_modules/vite/dist/node/index.js";
import react from "file:///home/kagwe/projects/Art-Room/node_modules/@vitejs/plugin-react/dist/index.mjs";
import wasm from "file:///home/kagwe/projects/Art-Room/node_modules/vite-plugin-wasm/exports/import.mjs";
import topLevelAwait from "file:///home/kagwe/projects/Art-Room/node_modules/vite-plugin-top-level-await/exports/import.mjs";
var __vite_injected_original_dirname = "/home/kagwe/projects/Art-Room";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const basePath = env.SET_SUBPATH_FOR_PROD === "true" ? "/pem" : "/";
  console.log("[vite] Building with base path:", basePath);
  return {
    base: basePath,
    plugins: [
      react(),
      ,
      wasm(),
      topLevelAwait()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    optimizeDeps: {
      exclude: [
        "@babylonjs/havok"
      ]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYWd3ZS9wcm9qZWN0cy9BcnQtUm9vbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUva2Fnd2UvcHJvamVjdHMvQXJ0LVJvb20vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUva2Fnd2UvcHJvamVjdHMvQXJ0LVJvb20vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0Jztcbi8vIGltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuaW1wb3J0IHdhc20gZnJvbSBcInZpdGUtcGx1Z2luLXdhc21cIjtcbmltcG9ydCB0b3BMZXZlbEF3YWl0IGZyb20gXCJ2aXRlLXBsdWdpbi10b3AtbGV2ZWwtYXdhaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgLy8gSW4gcHJvZCwgYXBwIHdpbGwgYmUgc2VydmVkIHVuZGVyIGBkZW1vLmlleC5lYy9wZW1gIHBhdGhcbiAgY29uc3QgYmFzZVBhdGggPSBlbnYuU0VUX1NVQlBBVEhfRk9SX1BST0QgPT09ICd0cnVlJyA/ICcvcGVtJyA6ICcvJztcbiAgY29uc29sZS5sb2coJ1t2aXRlXSBCdWlsZGluZyB3aXRoIGJhc2UgcGF0aDonLCBiYXNlUGF0aCk7XG4gIHJldHVybiB7XG4gICAgYmFzZTogYmFzZVBhdGgsXG4gICAgcGx1Z2luczogW1xuICAgICAgcmVhY3QoKSxcbiAgICAgIC8vIHZpc3VhbGl6ZXIoKSxcbiAgICAgICx3YXNtKCksdG9wTGV2ZWxBd2FpdCgpXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZXhjbHVkZTogW1xuICAgICAgICBcIkBiYWJ5bG9uanMvaGF2b2tcIlxuICAgICAgXVxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsT0FBTyxVQUFVO0FBQzFSLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUVsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFMMUIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFFBQU0sV0FBVyxJQUFJLHlCQUF5QixTQUFTLFNBQVM7QUFDaEUsVUFBUSxJQUFJLG1DQUFtQyxRQUFRO0FBQ3ZELFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUVOO0FBQUEsTUFBQyxLQUFLO0FBQUEsTUFBRSxjQUFjO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxJQUNBLGNBQWM7QUFBQSxNQUNaLFNBQVM7QUFBQSxRQUNQO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
