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