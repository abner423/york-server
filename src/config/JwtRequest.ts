import { JwtPayload } from "jsonwebtoken";

export interface JwtRequest extends JwtPayload {
    id: string,
    email: string,
    isAdmin: boolean;
}