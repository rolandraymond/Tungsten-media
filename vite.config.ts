import { defineConfig, PluginOption } from "vite"; // أضفنا PluginOption
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // حددنا نوع المصفوفة عشان نرضي TypeScript
  const plugins: PluginOption[] = [react()];
  
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
    plugins: plugins, // الآن Plugins أصبحت مصفوفة صحيحة
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