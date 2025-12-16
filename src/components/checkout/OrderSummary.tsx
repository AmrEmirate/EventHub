"use client";

interface OrderSummaryProps {
  subtotal: number;
  discountAmount: number;
  pointsUsed: number;
  finalPrice: number;
  formatPrice: (price: number) => string;
}

export function OrderSummary({
  subtotal,
  discountAmount,
  pointsUsed,
  finalPrice,
  formatPrice,
}: OrderSummaryProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>{formatPrice(subtotal)}</p>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-green-600">
          <p>Diskon Voucher</p>
          <p>- {formatPrice(discountAmount)}</p>
        </div>
      )}
      {pointsUsed > 0 && (
        <div className="flex justify-between text-green-600">
          <p>Potongan Poin</p>
          <p>- {formatPrice(pointsUsed)}</p>
        </div>
      )}
      <div className="flex justify-between text-xl font-bold">
        <p>Total Akhir</p>
        <p>{formatPrice(finalPrice)}</p>
      </div>
    </div>
  );
}
