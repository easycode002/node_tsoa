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




- ProductRepository (Try, Catch, If, Return: No complex)
  . getAllProduct
    - Params  : queries:ProductGetAllRepoParams
    - Promise : No
  . createProduct
    - Params  : ProductCreateRequest
    - Promiss : IItem
  . getProductById
    - Params  : id:string
    - Promise : IItem
  . updateProduct
    - Params  : id, ProductUpdateRequest
    - Promise : IItem
  . deleteProduct
    - Params  : id
    - Promise : void

- ProductSevice
  . getAllProduct
    - Params  : queries:ProductGetAllRequest
    - Promise : No
  . createProduct
    - Params  : ProductCreateRequest
    - Promise : IItem
  . getProductById
    - Params  : id:string
    - Promise : IItem
  . updateProduct
    - Params  : id, ProductUpdateRequest
    - Promise : IItem
  . deleteProduct
    - Params  : id
    - Promise : void

- ProductController
  . getAllProduct
    - Params  : queries:ProductGetAllRequest
    - Promise : ProductPaginatioResponse
  . createPruduct
    - requestBody: ProductCreateRequest
    - Promise : ProductResponse
  . getProductById
    - Params  : id
    - Promise : ProductResponse
  . updateProduct
    - Params  : id, requestBody:ProductUpdateRequest
    - Promise : ProductResponse
  . deleteProduct
    - Params  : id (@Path())
    - Promise : void