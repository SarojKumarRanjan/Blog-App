import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import authService from "@/Appwrite/auth";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login as authLogin } from "@/Store/authSlice";

function Signup() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const createUser = async (data) => {
    setError("");

    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          console.log("error in userdata in signup page", error);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <Input
        label="Full Name: "
        placeholder="Enter your full name"
        {...register("name", {
          required: true,
        })}
      />
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

      <Button type="submit">Sign up</Button>
    </form>
  );
}

export default Signup;
