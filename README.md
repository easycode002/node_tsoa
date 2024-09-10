## Improve `tsoa` to project
Install mongodb driver to project.
```bash
yarn add mongoose
```

silently-remove-extras vs throw-on-extras
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras", 
  "controllerPathGlobs": ["src/controllers/*.controller.ts"],
  "spec": {
    "outputDirectory": "src/docs",
    "specVersion": 3
  },
  "routes": {
    "routesDir": "src/routes/v1"
  },
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
