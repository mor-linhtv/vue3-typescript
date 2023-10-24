import { axios } from "@/lib/axios";
import { END_POINT } from "@/constant";
import type { UserResponse } from "../types";

export type LoginCredentialsDTO = {
  user_code: string;
  password: string;
};

export const loginWithEmailAndPassword = (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  return axios.post(END_POINT.END_POINT_LOGIN, data);
};
export const logoutApi = (): Promise<UserResponse> => {
  return axios.post(END_POINT.END_POINT_LOGOUT);
};
