import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/apihelper";

export interface EventFormData {
  name: string;
  description: string;
  category: string;
  location: string;
  startDate: string;
  endDate: string;
  price: number;
  isFree: boolean;
  ticketTotal: number;
}

const initialFormData: EventFormData = {
  name: "",
  description: "",
  category: "",
  location: "",
  startDate: "",
  endDate: "",
  price: 0,
  isFree: false,
  ticketTotal: 100,
};

export function useCreateEvent() {
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    },
    []
  );

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setImageFile(e.target.files[0]);
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          data.append(key, String(value));
        });

        if (imageFile) {
          data.append("imageUrl", imageFile);
        }

        await createEvent(data);
        alert("Event berhasil dibuat!");
        router.push("/organizer/dashboard");
      } catch (err: any) {
        const errorMessage = err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat().join(", ")
          : err.response?.data?.message ||
            "Terjadi kesalahan saat membuat event.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [formData, imageFile, router]
  );

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSelectChange,
    handleImageChange,
    handleSubmit,
  };
}
