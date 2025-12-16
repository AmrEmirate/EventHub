"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as apiRegister } from "@/lib/apihelper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { RegistrationSuccess } from "@/components/auth/RegistrationSuccess";
import { RegisterFormFields } from "@/components/auth/RegisterFormFields";

const registerFormSchema = z
  .object({
    name: z.string().min(3, { message: "Nama lengkap minimal 3 karakter." }),
    email: z.string().email({ message: "Format email tidak valid." }),
    password: z.string().min(6, { message: "Password minimal 6 karakter." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Konfirmasi password minimal 6 karakter." }),
    role: z.enum(["CUSTOMER", "ORGANIZER"]),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "CUSTOMER",
      referralCode: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { confirmPassword, ...dataToSend } = data;
      await apiRegister(dataToSend);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registrasi gagal, silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) return <RegistrationSuccess />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join EventHub and start discovering amazing events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <RegisterFormFields
                form={form}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="p-6 pt-0 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline font-semibold">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}
