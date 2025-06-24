"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import loginUser from "@/server/actions/auth/LoginUser";
import Image from "next/image";

const loginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const email = data.emailOrUsername;
      const password = data.password;
      const { error } = await loginUser(email, password);

      if (error) {
        toast.error("Login Failed", {
          description: error,
        });
        return;
      }

      toast.success("Login Successful", {
        description: "Welcome back! Redirecting to dashboard...",
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-2">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Image
                src="/images/HiFive_Main_Logo_Portrait.png"
                alt="HiFive"
                height={20}
                width={20}
                className="h-8 w-auto"
              />
              <span className="font-semibold text-gray-900">Dashboard</span>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Log in to your account
            </h1>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="emailOrUsername"
                  className="text-sm font-medium text-hifive-gray"
                >
                  Email
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email"
                  className={`w-full ${
                    errors.emailOrUsername ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                  {...register("emailOrUsername")}
                />
                {errors.emailOrUsername && (
                  <p className="text-sm text-red-600">
                    {errors.emailOrUsername.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-hifive-gray"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`w-full pr-10 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Controller
                    name="rememberMe"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-gray-700">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-hifive-blue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-hifive-blue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-hifive-blue hover:underline"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
