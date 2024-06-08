"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/__component-library/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/__component-library/card";
import { Input } from "@/components/__component-library/input";
import { Label } from "@/components/__component-library/label";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/__component-library/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Credentials = {
  email: string;
  password: string;
};

const login = (formData: Credentials) =>
  fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "include", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(formData), // body data type must match "Content-Type" header
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();

      throw new Error(
        `${response.status} - ${response.statusText} - ${error.message}`
      );
    }
    return response.json();
  });

export default function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationKey: ["auth"],
    mutationFn: (formData: Credentials) => login(formData),
    onSuccess: (data, variable, context) => {
      router.push("/dashboard");
    },
    onError: () => {},
  });

  const handleSubmit = (formData: Credentials) => {
    mutate(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="container min-h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {isError && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error?.message}</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSubmit(credentials)}
            >
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
