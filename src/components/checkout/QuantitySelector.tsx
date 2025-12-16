"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (amount: number) => void;
  ticketPrice: number;
  formatPrice: (price: number) => string;
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  ticketPrice,
  formatPrice,
}: QuantitySelectorProps) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Detail Pesanan</h4>
      <div className="flex justify-between">
        <p>Harga Tiket</p>
        <p>{formatPrice(ticketPrice)}</p>
      </div>
      <div className="flex justify-between items-center">
        <p>Jumlah</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="font-bold w-10 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onQuantityChange(1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
