import { useMutation, useQuery, UseQueryResult } from "react-query";
import { AuthState } from "../../redux/slices/authSlice";
import {
  getUserSession,
  login,
  LoginData,
  logout,
  register,
} from "./auth.service";

export default {
  useLogin: () =>
    useMutation(({ email, password }: LoginData) => {
      return login({ email, password });
    }),

  useRegister: () =>
    useMutation(({ email, password }: LoginData) => {
      return register({ email, password });
    }),

  useLogout: () =>
    useMutation(() => {
      return logout();
    }),
  useCheckAuth: (): UseQueryResult<string> =>
    useQuery("getUserSession", async () => {
      return await getUserSession();
    }),
};
