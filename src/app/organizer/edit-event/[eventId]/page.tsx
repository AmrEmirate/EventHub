"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { getEventById, updateEvent } from "@/lib/apihelper";
import {
  EventFormFields,
  EventFormData,
} from "@/components/events/EventFormFields";

export default function EditEventPage() {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    price: 0,
    isFree: false,
    ticketTotal: 100,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { eventId } = params;

  useEffect(() => {
    if (typeof eventId !== "string") return;

    const fetchEventData = async () => {
      setLoading(true);
      try {
        const response = await getEventById(eventId as string);
        const event = response.data;

        const toDateTimeLocal = (dateString: string) => {
          if (!dateString) return "";
          const date = new Date(dateString);
          date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
          return date.toISOString().slice(0, 16);
        };

        setFormData({
          name: event.name,
          description: event.description,
          category: event.category,
          location: event.location,
          startDate: toDateTimeLocal(event.startDate),
          endDate: toDateTimeLocal(event.endDate),
          price: event.price,
          isFree: event.isFree,
          ticketTotal: event.ticketTotal,
        });
        setExistingImageUrl(event.imageUrl || null);
      } catch (err) {
        setError("Gagal memuat data event.");
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        isFree: isChecked,
        price: isChecked ? 0 : prev.price,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof eventId !== "string") return;
    setIsSubmitting(true);
    setError(null);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, String(value));
      });
      if (imageFile) {
        data.append("imageUrl", imageFile);
      }

      await updateEvent(eventId, data);
      alert("Event berhasil diperbarui!");
      router.push("/organizer/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Terjadi kesalahan saat memperbarui event."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  if (error && !formData.name)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 p-4">
        {error}
      </div>
    );

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
              <CardTitle className="text-2xl">Edit Event</CardTitle>
              <CardDescription>
                Perbarui detail event Anda di bawah ini.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <EventFormFields
                formData={formData}
                onFieldChange={handleChange}
                onSelectChange={handleSelectChange}
                onImageChange={handleImageChange}
                existingImageUrl={existingImageUrl}
              />

              {error && (
                <p className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-md">
                  {error}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Menyimpan Perubahan..." : "Simpan Perubahan"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
