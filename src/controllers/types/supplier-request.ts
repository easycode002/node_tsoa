export interface SupplierCreateRequest {
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: Date; // ISO format (YYYY-MM-DD)
}

export interface SupplierUpdateRequest {
  first_name?: string;
  last_name?: string;
  gender?: number;
  email?: string;
  phone_number?: string;
  address?: string;
  date_of_birth?: Date;
}