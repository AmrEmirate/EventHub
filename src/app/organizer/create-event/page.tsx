"use client";

import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventFormFields } from "@/components/events/EventFormFields";
import { useCreateEvent } from "@/hooks/use-create-event";

export default function CreateEventPage() {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleImageChange,
    handleSubmit,
  } = useCreateEvent();

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-6">
          <Link
            href="/organizer/dashboard"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Buat Event Baru</CardTitle>
              <CardDescription>
                Isi detail di bawah ini untuk mempublikasikan event Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <EventFormFields
                formData={formData}
                onFieldChange={handleChange}
                onSelectChange={handleSelectChange}
                onImageChange={handleImageChange}
              />
              {error && (
                <p className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-md">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? "Menyimpan..." : "Buat Event"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
