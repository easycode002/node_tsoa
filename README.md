## Application Promming Interface with `tsoa`

### Step-by-Step Guide

#### 1.Create and initialize a Project Dirctory

Run the command below:

```bash
# Create directory for project
mkdir api_tsosfa
# Navigate to directory project
cd api_tsoa
# Init project
yarn init -y
```

Overall Folder project structure:

```bash
Project Folder Structure
├── build/                  # Compiled files from TypeScript to
│							# JavaScript for production
├── node_modules/           # Project dependencies
├── src/                    # Source files
│   ├── configs/            # Configuration files for the application
│   ├── controllers/        # Handles incoming requests and send responses
│   ├── database/           # Database connection logic, models
│   │                       # and repositories
│   ├── docs/               # Swagger/OpenAPI documentation files
│   ├── middlewares/        # Express middleware for request processing
│   ├── routes/             # Route definitions linking requests to controllers
│   ├── services/           # Business logic and data access code
│   └── utils/              # Utility functions and helpers
│   ├── app.ts              # Initializes and configures the application
│   └── server.ts           # Entry point for the application, starts the server
├── build-script.js         # Script for compiling TypeScript using esbuild
├── nodemon.json            # Nodemon configuration for development
├── package.json            # Manages dependencies and project metadata
├── tsconfig.json           # TypeScript compiler configuration
└── tsoa.json               # tsoa configuration for routes and documentation
                            # generation
```

#### 2.Install Express and Config TypeScript

Run the command below:

```bash
# Install express to dependencies
yarn add express
# Install express, node, ts-node to devDependencies
yarn add typescript @types/express @types/node ts-node --dev
```

> [!NOTE]
> ts-node : a package or library that allow to run typescript file.
> Initial `tsconfig.json` in root project directory.

```bash
yarn tsc --init
```

Setup TypeScript Configuration

- In `tsconfig.json` file in the root of project:

```bash
{
  "compilerOptions": {
    "module": "CommonJS", // Set module system to `CommonJS`
    "esModuleInterop": true, // Allow default import from module that export using `module.exports`
    "target": "es6", // Target to compile JavaScript
    "moduleResolution": "Node", // Tell TypeScript, using node.js to resolution algorith
    "sourceMap": true, // Enable source map generation for ez debug
    "rootDir": "./src", //
    "strict": true, // Enable all strict type-checking
    "experimentalDecorators": true, // Allow use experimental decorators
    "emitDecoratorMetadata": true, //Emits metadata for decorators used in the project.
    "resolveJsonModule": true, // Allow import JSON file as module
    "noImplicitAny": true, // Prevent TypeScript from inferring the `any` type unless explicilty define, helping ensure type safety
    "noUnusedLocals": true, //Throws an error if there are any local variables that are declared but not used in the code.
    "noUnusedParameters": true, // Throw an error if there are any unused function parameter
    "alwaysStrict": true, //Ensures that the "use strict" directive is added to every file
    "pretty": true // Ensures the TypeScript compiler output is more readable and user-friendly.
  },
  "include": ["src/**/*"], //Includes all files inside the `src` folder
  "exclude": ["node_modules", "**/*.spec.ts"] //Excludes the node_modules directory and all .spec.ts test files from the TypeScript compilation.
}
```

#### 3.Create a Basic Express Server

Create a folder called src and create a file inside called `server.ts` and include the code below:

```bash
import express from 'express'

const app = express();

app.listen(3000,()=>{console.log(`Server is running on port:`,3000)})
```

#### 4.Run the Express Server

Include the following script to `package.json` in root project:

```bash
{
  "name": "user-service",
  "version": "1.0.0",
  "main": "src/server.ts",
  "license": "MIT",
  "scripts": {
    "dev":"ts-node src/server.ts"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.5.4",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

Run the server in development mode, Go to terminal and run:

```bash
yarn dev
```

#### 5.Live Reloading Code

> [!NOTE]
> By default when we made change in our application code, we need to close the process of our application `ctrl+c` and return `yarn dev` > _Soluttion_ : Install `nodemon` for watcing file made change:

```bash
# Nodemon, only use in development mode
yarn add nodemon --dev
```

Configuration: Create a `nodemon.json` file to config in root:

```bash
touch nodemon.js
```

After create, Include the following script:

```bash
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/server.ts"
}
```

Change ths script in the `package.json`

```bash
  "scripts": {
    "dev": "nodemon src/server.ts",
  },
```

#### 6.Create a Build Script for production Mode

We use `Esbuild` to compile and bunding our code into production code:
To be install:

```bash
# Install to devDependencies only
yarn add esbuild --dev
```

Configuration: Create a file called `build-script.js` in the root of the project:

```bash
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
  })
  .catch((error) => {
    console.error(`Build failed:`, error);
    process.exit(1);
  });
```

Configuration: Add a script inside `package.json`

```bash
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build":"node build-script.js",
    "start:local":"node ./build/server.js"
  },
```

To run the production code:

```bash
# Build/Bundle code to small package
yarn build
# Run productoin test
yarn start:local
```

#### 7.Using Absolute Import

Absolute imports simplify the import path in your application, making them more readable and maintainable. U will use `tsconfig-paths` to enable this feature in your Typescript configuration.
Install tsconfig-paths:

```bash
yarn add tsconfig-paths --dev
```

Configuration: modify `tsconfig.ts`

```bash
{
  "compilerOptions": {
    "module": "CommonJS", // Set module system to `CommonJS`
    "esModuleInterop": true, // Allow default import from module that export using `module.exports`
    "target": "es6", // Target to compile JavaScript
    "moduleResolution": "Node", // Tell TypeScript, using node.js to resolution algorith
    "sourceMap": true, // Enable source map generation for ez debug
    "rootDir": "./src", //
    "outDir": "./build",
    "strict": true, // Enable all strict type-checking
    "experimentalDecorators": true, // Allow use experimental decorators
    "emitDecoratorMetadata": true, //Emits metadata for decorators used in the project.
    "resolveJsonModule": true, // Allow import JSON file as module
    "noImplicitAny": true, // Prevent TypeScript from inferring the `any` type unless explicilty define, helping ensure type safety
    "noUnusedLocals": true, //Throws an error if there are any local variables that are declared but not used in the code.
    "noUnusedParameters": true, // Throw an error if there are any unused function parameter
    "alwaysStrict": true, //Ensures that the "use strict" directive is added to every file
    "pretty": true, // Ensures the TypeScript compiler output is more readable and user-friendly.
    // Import file from the root directory using `@` prefix
    "baseUrl": "./src", // Added: New
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src/**/*"], //Includes all files inside the `src` folder
  "exclude": ["node_modules", "**/*.spec.ts"], //Excludes the node_modules directory and all .spec.ts test files from the TypeScript compilation.
  // Allow ts-node to run with tsconfig-paths
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
```

##### Testing the Absolute Path

Separate the file App Logic and Server
Create a file called `app.ts` in `src` folder:

```bash
import express from "express";

// =============================================
// Initialize App Express
// =============================================
const app = express();

export default app;
```

Inside file `server.ts`
Modify the existing code to this:

```bash
import app from "@/app";

function run() {
  app.listen(3000, () => {
    console.log(`Server is running on port:`, 3000);
  });
}

run();
```

Run the develoment mode:

```bash
yarn dev
```

##### For production(ESBuild)

```bash
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
```

To run the production code:

```bash
# Build/Bundle code to small package
yarn build
# Run productoin test
yarn start:local
```

#### 8.API Documentatiotn

API documentation include detialed information about an API's available endpoint, methods, resource, authentication protocol, parameter, and headers, as well as example of common request and response.
We use `tsoa` library which automatically generate Swagger (OPENAPI) documation based on TypeScript code && swagger-ui-express to render the UI from `swagger.json`
Install:

```bash
yarn add tsoa @types/swagger-ui-express --dev
```

Conguration: Create a `tsoa.json` file in your project root:

```bash
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/controllers/*.controller.ts"],
  // Swagger.json Where TSOA generate
  "spec": {
    "outputDirectory": "src/docs",
    "specVersion": 3
  },
  // Location that TSOA generate routes
  "routes": {
    "routesDir": "src/routes/v1"
  },
  // Allow Tsoa to Recognize the Absolute Path
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

##### Setup Controllers

Create a folder called `controllers` inside that folder create a file `product.controller.ts` Organize your controller using decorators provide by `tsoa`:

```bash
import { Controller, Route, Get } from "tsoa";

export interface IItem {
  name: string;
  cagetory: string;
  price: number;
}

@Route("v1/product")
export class ProductController extends Controller {
  @Get("/")
  public getAllProducts() {
    // Return the array wrapped in a Promise
    return [{ id: 1, name: "Cherrie", category: "fruit", price: 10.2 }];
  }
}
```

- `@Route("v1/product")` : a decorator that tell our main route or API is `v1/product`
- `@Get("/")` : a decorator of our sub route from main route (`v1/product`) is `/`. So the full is: `v1/product`
- These decorator help `tsoa` understand, How to document the API.

##### Generate API Specs and Route

Configuration: Add a script to your `package.json` to generate routes:

```bash
  "scripts": {
    "tsoa:gen": "tsoa spec && tsoa routes",
    "dev": "nodemon src/server.ts",
    "build": "node build-script.js",
    "start:local": "node ./build/server.js"
  },
```

Run the command, `yarn tsoa:gen`, It will generate a folder `docs` and `routes/v1` in `src` folder:

```bash
yarn tsoa:gen
```

##### Render `swagger.json` to Interface or UI

Config this inside `app.ts`

```bashs
import express from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "@/routes/v1/routes";
import fs from "fs";
import path from "path";

// Dynamically load swagger.json
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs/swagger.json"), "utf8")
);

// =============================================
// Initialize App Express
// =============================================
const app = express();

// =============================================
// Global Middleware
// =============================================
app.use(express.json()); // Help to get the json from request body

// =============================================
//  Global API V1
// =============================================
RegisterRoutes(app);

// ========================
// API Documentations
// ========================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;
```

Run `yarn dev` and access to `http://localhost:3000/api-docs/` in browser

##### For production (Esbuild)

Problem:

1.  Foder docs contains file `swagger.json` which **esbuild** is not responsible for bundle
    - _Solotion_ : Copy the `docs` folder into `build` folder
2.  SwaggerUIBunder is not define in production - Copy some asset file like html, css of swagger-ui-express into `build` folder
    Inside `build-script.js`

```bash
yarn add esbuild-plugin-copy --dev
```

```bash
const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');
const copy = require('esbuild-plugin-copy').default;

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
    plugins: [
      // (2) Solve: https://stackoverflow.com/questions/62136515/swagger-ui-express-plugin-issue-with-webpack-bundling-in-production-mode/63048697#63048697
      copy({
        assets: {
          from: [
            "../node_modules/swagger-ui-dist/*.css",
            "../node_modules/swagger-ui-dist/*.js",
            "../node_modules/swagger-ui-dist/*.png",
          ],
          to: ["./"],
        },
      }),
    ],
    resolveExtensions: [".ts", ".js"],
    define: {
      "process.env.NODE_ENV": '"production"', // This env will avaibale in our application process
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
```

#### 9. Dotenv

Some sensitive value like `MONGO_URL`, `SECRET_KEY`, etc should be store in `.env` file. To load those value we need to use `dotenv`
Install:

```bash
yarn add dotenv joi
```

- `dotenv` : for store sensitive value.
- `joi` : for load content from `dotenv` file.
  Create a file called: `.env.development` in `configs` folder:

```bash
# Port API Service to run:
PORT=3000

NODE_ENV=development

MONGODB_URL=mongodb://localhost:27017/mydatabase
```

Create a file called: `config.ts` inside `src`:

```bash
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

// Define type for load content from .env file
type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
};

// Function to load and validate env variable
function loadConfig(): Config {
  // Determine the env and set the appropriate .env file
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  console.log(`Loading env from: ${envPath}`);

  dotenv.config({ path: envPath });

  // Define a schema for env varaible
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate the env varaible
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
  };
}

// Export the load configs from env
const configs = loadConfig();
export default configs;
```

Call `configs` to use in `server.ts`

```bash
import app from "@/app";
import configs from "@/config";

function run() {
  app.listen(configs.port, () => {
    console.log(`Server is running on http://localhost:${configs.port}`);
  });
}

run();
```

##### Problem in Production Local Code (Esbuild)

- Inside the `build` folder, there is no `.env file` to load during application running.
- Solution: Copy the `configs` folder to the `build` folder. **_Noted_** we need to defferent file env for defferent env, in this case we use `.env.local`

```bash
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
    plugins: [
      // (2) Solve: https://stackoverflow.com/questions/62136515/swagger-ui-express-plugin-issue-with-webpack-bundling-in-production-mode/63048697#63048697
      copy({
        assets: [
          // Copy swagger UI assets and env file
          { from: "../node_modules/swagger-ui-dist/*", to: "./" },
          {
            from: "./src/configs/.env.local",
            to: "./configs/.env.development",
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
```
