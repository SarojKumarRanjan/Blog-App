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
      // Attempt to log in with provided data
      const session = await authService.login(data);
    
      if (session) {
        // If login successful, retrieve current user data
        const userData = await authService.getCurrentUser();
    
        if (userData) {
          // If user data is retrieved successfully, dispatch login action and navigate to home page
         // console.log(userData);
          dispatch(authLogin(userData));
          navigate("/");
        } else {
          // If user data is not retrieved, log an error
          console.error("Error: Unable to retrieve user data after login",error);
        }
      } else {
        // If session is not returned after login, log an error
        console.error("Error: No session returned after login");
      }
    } catch (error) {
      // If any error occurs during login process, set error state to display to the user
      setError(error.message);
    }
  }    

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
