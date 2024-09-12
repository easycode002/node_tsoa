// import {
//   Body,
//   Controller,
//   Route,
//   Post,
//   Tags,
//   Get,
//   Path,
//   Put,
//   Delete,
//   Example,
//   Response,
// } from "tsoa";
// import { SupplierResponse } from "@/controllers/types/supplier-response";

// import {
//   SupplierCreateRequest,
//   // ProductGetAllRequest,
//   SupplierUpdateRequest,
// } from "./types/supplier-request";
// import SupplierService from "@/services/supplier.service";

// // Define supplier class
// @Route("v1/supplier")
// @Tags("Supplier")
// class SupplierController extends Controller {
//   // Create new instand of SupplierService
//   @Post()
//   @Example<SupplierResponse>({
//     message: "Supplier created",
//     data: {
//       first_name: "Sothea",
//       last_name: "Mab",
//       gender: 1,
//       email: "sotheamab@gmail.com",
//       phone_number: "0987654321",
//       address: "PP, PP, PP",
//       date_of_birth: new Date("2001-12-12"),
//       createAt: new Date(),
//     },
//   })
//   @Response(200, "Created")
//   public async createSupplier(@Body() requestBody: SupplierCreateRequest) {
//     // console.log(`Request body:`, requestBody);
//     try {
//       const supplier = await SupplierService.createSupplier(requestBody);
//       console.log(supplier);
//       return {
//         message: "Supplier created",
//         data: {
//           first_name: supplier.first_name,
//           last_name: supplier.last_name,
//           gender: supplier.gender,
//           email: supplier.email,
//           phone_number: supplier.phone_number,
//           address: supplier.address,
//           date_of_birth: supplier.date_of_birth,
//           createAt: supplier.createAt,
//           updateAt: supplier.updateAt,
//           deleteAt: supplier.deleteAt,
//         },
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Get all supplier
//   @Get()
//   public async getAllSupplier() {
//     try {
//       const supplier = await SupplierService.getAllSupplier();
//       if (!supplier) {
//         throw new Error(`No product available in database.`);
//       }
//       return supplier;
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Get supplier By Id
//   @Get("{id}")
//   public async getSupplierById(@Path() id: string): Promise<SupplierResponse> {
//     try {
//       const supplier = await SupplierService.getSupplierById(id);
//       if (!supplier) {
//         throw new Error(`Supplier ID:${id} not found`);
//       }
//       return {
//         message: "All product avaible in database",
//         data: supplier,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Update supplie
//   @Put("{id}")
//   public async updateSupplier(
//     @Path() id: string,
//     @Body() requestBody: SupplierUpdateRequest
//   ): Promise<SupplierResponse> {
//     try {
//       const updateSupplier = await SupplierService.updateSupplier(
//         id,
//         requestBody
//       );
//       console.log(updateSupplier);
//       return {
//         message: "",
//         data: updateSupplier,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }

//   // Delete supplier
//   @Delete("{id}")
//   public async deleteSupplier(@Path() id: string): Promise<SupplierResponse> {
//     try {
//       const deleteSupplier = await SupplierService.deleteSupplier(id);
//       if (!deleteSupplier) {
//         throw new Error(`Supplier with ID:${id} not found`);
//       }
//       return {
//         message: "Supplier marked as deleted",
//         data: deleteSupplier,
//       };
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default new SupplierController();
