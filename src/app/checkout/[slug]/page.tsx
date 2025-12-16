"use client";

import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { QuantitySelector } from "@/components/checkout/QuantitySelector";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCheckout } from "@/hooks/use-checkout";

export default function CheckoutPage() {
  const params = useParams();
  const { slug } = params;

  const {
    event,
    profile,
    loading,
    error,
    quantity,
    voucherCode,
    setVoucherCode,
    usePoints,
    setUsePoints,
    isProcessing,
    appliedVoucher,
    subtotal,
    finalPrice,
    pointsUsed,
    discountAmount,
    handleQuantityChange,
    handleCheckout,
    formatPrice,
  } = useCheckout(slug as string);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  if (error || !event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        {error || "Event tidak ditemukan."}
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Checkout</CardTitle>
            <CardDescription>
              Selesaikan pesanan untuk event:{" "}
              <span className="font-semibold">{event.name}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <QuantitySelector
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
              ticketPrice={event.price}
              formatPrice={formatPrice}
            />
            <Separator />
            <div className="space-y-4">
              <h4 className="font-medium">Gunakan Poin & Voucher</h4>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="usePoints"
                  checked={usePoints}
                  onCheckedChange={(checked) => setUsePoints(Boolean(checked))}
                  disabled={!profile || profile.points === 0}
                />
                <Label htmlFor="usePoints" className="text-sm font-medium">
                  Gunakan {profile?.points.toLocaleString() || 0} poin Anda?
                </Label>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Masukkan kode voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                />
                <Button variant="outline" disabled={!appliedVoucher}>
                  Terapkan
                </Button>
              </div>
              {appliedVoucher && (
                <p className="text-sm text-green-600">
                  Voucher {appliedVoucher.discountPercent}% berhasil diterapkan!
                </p>
              )}
            </div>
            <Separator />
            <OrderSummary
              subtotal={subtotal}
              discountAmount={discountAmount}
              pointsUsed={pointsUsed}
              finalPrice={finalPrice}
              formatPrice={formatPrice}
            />
            {error && (
              <p className="text-center text-sm text-red-500">{error}</p>
            )}
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isProcessing ? "Memproses..." : "Lanjutkan ke Pembayaran"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
