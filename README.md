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
```bash
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