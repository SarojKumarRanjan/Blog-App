import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "@/Store/authSlice";
import {useDispatch} from 'react-redux'
import authService from "@/Appwrite/auth";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Label } from "./ui/label";
import { AlertDialog, AlertDialogDescription } from "./ui/alert-dialog";



import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function LoginPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async(data) => {
    setError("")
    try {
        const session = await authService.login(data)
        if (session) {
            const userData = await authService.getCurrentUser()
            if(userData) dispatch(authLogin(userData));
            navigate("/")
        }
    } catch (error) {
        setError(error.message)
        
    }
    
}

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to create and manage your posts
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(login)} className="space-y-6">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPatern: (value) =>
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                      "Email address must be valid",
                  },
                })}
              />
            </div>

            <div className="space-y-2">
             
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full"
                {...register("password", {
                  required: true,
                })}
              />
            </div>

            {error && (
              <AlertDialog variant="destructive" className="mt-4">
                <AlertDialogDescription>
                  {error}
                </AlertDialogDescription>
              </AlertDialog>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link 
                to="/signup" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
