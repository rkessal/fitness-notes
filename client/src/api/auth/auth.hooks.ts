import { useMutation } from "react-query";
import { AuthState } from "../../redux/slices/authSlice";
import { login, LoginData, logout, register } from "./auth.service";

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
};
