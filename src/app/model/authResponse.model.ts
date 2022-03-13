import { Token } from "./token.model";
import { User } from "./user.model";

export interface AuthResponse{
    user:User;
    token:Token;
}