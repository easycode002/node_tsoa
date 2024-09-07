const esbuild = require("esbuild");
const path = require("path");

esbuild
  .build({
    entryPoints: ["src/server.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: "build",
    external: ["express"],
    loader: {
      ".ts": "ts",
    },
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"', // This env will avaibale in our application process
    },
    // Add this so that It could resolve the path
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  })
  .catch((error) => {
    console.error(`Build failed:`, error);
    process.exit(1);
  });
