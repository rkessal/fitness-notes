import { useMutation } from "react-query";
import { login, LoginData } from "./auth.service";

export default {
  useLogin: () =>
    useMutation("login", async ({ email, password }: LoginData) => login),
};
