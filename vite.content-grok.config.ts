import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "dist",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                "content-grok": path.resolve(__dirname, "src/content-grok.ts"),
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
