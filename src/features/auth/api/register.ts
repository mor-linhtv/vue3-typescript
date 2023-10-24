import { axios } from "@/lib/axios";
import { END_POINT } from "@/constant";

export type RegisterCredentialsDTO = {
  full_name: string|number;
  gender: string|number;
  department_id: string|number;
  type: string|number;
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO
): Promise<any> => {
  return axios.post(END_POINT.END_POINT_REGISTER, data);
};
