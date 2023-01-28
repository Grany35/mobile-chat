export interface AuthResponse {
    id: number | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    accessToken: string |null;
    expiration: Date | null;
    userOperationClaims: UserOperationClaim[]| null;
    profileImage: string | null;
    about: string | null;
};

export interface UserOperationClaim {
    name: string;
};