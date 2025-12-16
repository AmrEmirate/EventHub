"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export function RegistrationSuccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md text-center p-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <CardTitle className="text-2xl mb-2">Registrasi Berhasil!</CardTitle>
        <CardDescription className="mb-6">
          Kami telah mengirimkan link verifikasi ke email Anda. Silakan periksa
          kotak masuk untuk mengaktifkan akun.
        </CardDescription>
        <Button asChild>
          <Link href="/auth/login">Kembali ke Halaman Login</Link>
        </Button>
      </Card>
    </div>
  );
}
