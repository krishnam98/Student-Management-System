import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id: string;
  role: "ADMIN" | "STUDENT";
  exp: number;
}

export const decodeToken = (token: string): DecodedToken => {
  return jwtDecode(token);
};
