"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setTokenAndFetchUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Login dengan Google gagal. Silakan coba lagi.");
      setTimeout(() => router.push("/auth/login"), 3000);
      return;
    }

    if (token) {
      localStorage.setItem("authToken", token);
      setTokenAndFetchUser(token)
        .then(() => {
          router.push("/");
        })
        .catch(() => {
          setError("Gagal memuat data pengguna.");
          setTimeout(() => router.push("/auth/login"), 3000);
        });
    } else {
      setError("Token tidak ditemukan.");
      setTimeout(() => router.push("/auth/login"), 3000);
    }
  }, [searchParams, router, setTokenAndFetchUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {error ? (
        <>
          <p className="text-red-500">{error}</p>
          <p className="text-muted-foreground text-sm">
            Mengalihkan ke halaman login...
          </p>
        </>
      ) : (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Memproses login...</p>
        </>
      )}
    </div>
  );
}
