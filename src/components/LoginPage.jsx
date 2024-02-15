import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "@/Store/authSlice";
import {useDispatch} from 'react-redux'
import authService from "@/Appwrite/auth";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");

    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
         // console.log(userData);
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          console.log("error in userdata in login page", error);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <Input
        label="Email: "
        placeholder="Enter your Email"
        type="email"
        {...register("email", {
          required: true,
          validate: {
            matchPatern: (value) =>
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
              "Email Address must be valid address",
          },
        })}
      />

      <Input
        label="Password"
        placeholder="Enter Password here"
        type="password"
        {...register("password", {
          required: true,
        })}
      />

      <Button type="submit">Sign in</Button>
    </form>
  );
}

export default LoginPage;
