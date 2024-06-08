"use client";

import { ChangeEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/_ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/_ui/card";
import { Input } from "@/components/_ui/input";
import { Label } from "@/components/_ui/label";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type User = {
  name: string;
  email: string;
  password: string;
};

const register = (user: User) =>
  fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();

      throw new Error(
        `${response.status} - ${response.statusText} - ${error.message}`
      );
    }
    return response.json();
  });

export default function RegisterForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: (user: User) => register(user),
    onSuccess: (data, variable, context) => {
      router.push("/login");
    },
    onError: () => {},
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (formData: FormData) => {
    const { firstName, lastName, email, password } = formData;
    mutate({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen container">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gap-4 grid">
            <div className="gap-4 grid grid-cols-2">
              <div className="gap-2 grid">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  name="firstName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="gap-2 grid">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  placeholder="Robinson"
                  name="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSubmit(formData)}
            >
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
