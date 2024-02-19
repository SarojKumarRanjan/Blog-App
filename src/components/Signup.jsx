import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import authService from "@/Appwrite/auth";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { login as authLogin } from "@/Store/authSlice";



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    <div className="flex justify-center mt-[150px] h-[400px]">
      <Card className="w-[400px]">
        <CardHeader className=" text-xl">
          <CardTitle>
           Sign up
          </CardTitle>
          <CardDescription>
            Welcome to Blog-App!
          </CardDescription>

        </CardHeader>
    <form onSubmit={handleSubmit(createUser)}>
      <CardContent className="my-4">
      <Input
        label="Full Name: "
        placeholder="Enter your full name"
        {...register("name", {
          required: true,
        })}
      />
      <Input
      className="my-5"
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
      </CardContent>
       <CardFooter>
      <Button type="submit">Sign up</Button>
      </CardFooter>
    </form>
    </Card>
    </div>
  );
}

export default Signup;
