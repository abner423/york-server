import { SignupResponse, UserLevelResponse } from ".";

export interface UsersResponse {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    affiliation: string;
    levels: UserLevelResponse[]
    signupLevel: SignupResponse
}