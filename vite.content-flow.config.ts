import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        target: "chrome88",
        outDir: "dist",
        emptyOutDir: false,
        copyPublicDir: false,
        rollupOptions: {
            input: {
                "content-flow": path.resolve(__dirname, "src/content-flow.ts"),
            },
            output: {
                entryFileNames: "src/[name].js",
                format: "iife",
                inlineDynamicImports: true,
            },
        },
    },
    define: {
        "process.env.NODE_ENV": '"production"',
    },
});
