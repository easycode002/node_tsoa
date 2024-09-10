const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs-extra");
const copy = require("esbuild-plugin-copy").default;

// Issure
// 1. Esbuild could not load swagger.json
// 2. SwaggerUIBundle is not define in production.
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
    // (2) Solve: https://stackoverflow.com/questions/62136515/swagger-ui-express-plugin-issue-with-webpack-bundling-in-production-mode/63048697#63048697
    plugins: [
      copy({
        assets: [
          // Copy swagger UI assets and env file
          { from: "../node_modules/swagger-ui-dist/*", to: "./" },
          {
            from: "./src/configs/.env.local",
            to: "./configs/.env.production",
          },
        ],
      }),
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
    // Add this so that It could resolve the path
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  })
  .then(() => {
    // (1) Solve: Copy swagger.json after successful build
    fs.copySync(
      path.resolve(__dirname, "src/docs/swagger.json"),
      path.resolve(__dirname, "build/docs/swagger.json")
    );
    console.log("Swagger JSON copied successfully!");
  })
  .catch((error) => {
    console.error(`Build failed:`, error);
    process.exit(1);
  });
