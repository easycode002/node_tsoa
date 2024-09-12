import express from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { RegisterRoutes } from "./routes/v1/routes";

// // Dynamically load swagger.json
// const swaggerDocument = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
// );

// // =============================================
// // Initialize App Express
// // =============================================
// const app = express();

// // =============================================
// // Global Middleware
// // =============================================
// app.use(express.json()); // Help to get the json from request body

// // =============================================
// //  Global API V1
// // =============================================
// RegisterRoutes(app);

// // ========================
// // API Documentations
// // ========================
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// export default app;

// Load Swagger JSON
const swaggerFile = path.resolve(__dirname, "docs/swagger.json");
const swaggerData = fs.readFileSync(swaggerFile, "utf8");
const swaggerDocument = JSON.parse(swaggerData);

// Initialize express app
const app = express();

// Global Middlewares
app.use(express.json());

// Register middleware
// app.use(reqDateMiddleware)

// Register routes
RegisterRoutes(app);

// Serve Swagger UI

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve Swagger JSON
app.get('/docs/swagger.json', (_req, res) => {
  res.sendFile(swaggerFile);
});


// Global Error Handler
// app.use(globalErrorHandler);

export default app;
