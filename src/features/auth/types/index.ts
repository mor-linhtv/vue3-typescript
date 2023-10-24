export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: "ADMIN" | "USER";
};

export type UserResponse = {
  code: number;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
  } | null;
};
