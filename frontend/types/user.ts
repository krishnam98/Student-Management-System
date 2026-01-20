export type Role = "ADMIN" | "USER";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  dob?: string;
  createdAt?: string;
}
