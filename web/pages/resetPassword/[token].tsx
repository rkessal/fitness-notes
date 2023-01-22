import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";

type Props = {};

export default function ResetPassword({}: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = router.query;
  const mutation = useMutation(
    (payload: {
      token: string | string[] | undefined;
      candidatePassword: string;
    }) => {
      return axios.put("http://localhost:1337/api/userPasswordReset", payload);
    }
  );

  console.log(router.query);
  const handleSubmit = () => {
    const post = mutation.mutate({ token: token, candidatePassword: password });
    console.log(post);
  };
  return (
    <div>
      <h1>Reset your password</h1>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
      ></input>
      <p>Make sure it's atleast 8 characters</p>
      <button onClick={handleSubmit}>Change password</button>
    </div>
  );
}
