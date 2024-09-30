import { Role } from "../enums/role";

export interface User {
  fullName: string;
  email: string;
  username: string;
  role: Role;
}

export interface LoginPayload {
  username: string;
  password: string;
}

