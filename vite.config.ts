import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { cloudflare } from "@cloudflare/vite-plugin"; // أضف هذا الاستيراد

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    cloudflare(), // أضف هذا السطر
    react(),
  ];
  
  if (mode === "development") {
    plugins.push(componentTagger());
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: [
        "react", 
        "react-dom", 
        "react/jsx-runtime", 
        "react/jsx-dev-runtime", 
        "@tanstack/react-query", 
        "@tanstack/query-core"
      ],
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    }
  };
});
