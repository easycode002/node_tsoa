export interface SupplierCreateRequest {
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: string; // ISO format (YYYY-MM-DD)
}
