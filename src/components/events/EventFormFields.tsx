"use client";

import { DollarSign, Ticket, Image as ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const categories = [
  "Technology",
  "Music",
  "Business",
  "Sports",
  "Education",
  "Arts",
  "Health",
];

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

interface EventFormFieldsProps {
  formData: EventFormData;
  onFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectChange: (name: string, value: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  existingImageUrl?: string | null;
}

export function EventFormFields({
  formData,
  onFieldChange,
  onSelectChange,
  onImageChange,
  existingImageUrl,
}: EventFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Nama Event</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={onFieldChange}
          placeholder="Contoh: Konser Musik Merdeka"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onFieldChange}
          placeholder="Jelaskan tentang event Anda..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Gambar Event</Label>
        <div className="relative flex items-center gap-4 rounded-md border border-input p-2">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <Input
            id="imageUrl"
            name="imageUrl"
            type="file"
            onChange={onImageChange}
            accept="image/png, image/jpeg"
            className="border-0 shadow-none p-0 h-auto file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
        {existingImageUrl && (
          <p className="text-xs text-muted-foreground">
            Gambar saat ini akan dipertahankan jika tidak memilih file baru.
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          Pilih gambar utama untuk event Anda (JPG atau PNG, maks 5MB).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) => onSelectChange("category", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih kategori..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Lokasi</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={onFieldChange}
            placeholder="Contoh: Jakarta Convention Center"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="startDate">Tanggal & Waktu Mulai</Label>
          <Input
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={onFieldChange}
            type="datetime-local"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Tanggal & Waktu Selesai</Label>
          <Input
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={onFieldChange}
            type="datetime-local"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-2">
          <Label htmlFor="price">Harga Tiket</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              value={formData.price}
              onChange={onFieldChange}
              placeholder="0"
              disabled={formData.isFree}
              className="pl-8"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 pb-2">
          <Checkbox
            id="isFree"
            name="isFree"
            checked={formData.isFree}
            onCheckedChange={(checked) =>
              onFieldChange({
                target: {
                  name: "isFree",
                  value: "",
                  type: "checkbox",
                  checked,
                },
              } as any)
            }
          />
          <Label htmlFor="isFree" className="cursor-pointer">
            Event ini Gratis
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ticketTotal">Jumlah Tiket Tersedia</Label>
        <div className="relative">
          <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="ticketTotal"
            name="ticketTotal"
            type="number"
            min="1"
            value={formData.ticketTotal}
            onChange={onFieldChange}
            required
            className="pl-8"
          />
        </div>
      </div>
    </>
  );
}
