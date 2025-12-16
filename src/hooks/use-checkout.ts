import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getEventBySlug,
  createTransaction,
  getMyProfile,
  getMyVouchers,
  Event,
  UserProfile,
  Voucher,
} from "@/lib/apihelper";

export function useCheckout(slug: string | undefined) {
  const [event, setEvent] = useState<Event | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [voucherCode, setVoucherCode] = useState("");
  const [usePoints, setUsePoints] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof slug !== "string") return;
    const fetchCheckoutData = async () => {
      setLoading(true);
      try {
        const [eventRes, profileRes, vouchersRes] = await Promise.all([
          getEventBySlug(slug),
          getMyProfile(),
          getMyVouchers(),
        ]);
        setEvent(eventRes.data);
        setProfile(profileRes.data);
        setVouchers(vouchersRes.data);
        setError(null);
      } catch (err) {
        setError("Gagal memuat data checkout. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, [slug]);

  const handleQuantityChange = useCallback((amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  }, []);

  const handleCheckout = useCallback(async () => {
    if (!event) return;
    setIsProcessing(true);
    setError(null);
    try {
      await createTransaction({
        eventId: event.id,
        quantity,
        voucherCode: voucherCode || undefined,
        usePoints,
      });
      alert("Transaksi berhasil dibuat! Silakan lanjutkan pembayaran.");
      router.push(`/profile/transactions`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Gagal membuat transaksi.");
    } finally {
      setIsProcessing(false);
    }
  }, [event, quantity, voucherCode, usePoints, router]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  }, []);

  const appliedVoucher = vouchers.find((v) => v.code === voucherCode);
  let subtotal = event?.price ? event.price * quantity : 0;
  let finalPrice = subtotal;
  let pointsUsed = 0;
  let discountAmount = 0;

  if (appliedVoucher) {
    discountAmount = (subtotal * appliedVoucher.discountPercent) / 100;
    if (
      appliedVoucher.maxDiscount &&
      discountAmount > appliedVoucher.maxDiscount
    ) {
      discountAmount = appliedVoucher.maxDiscount;
    }
    finalPrice -= discountAmount;
  }

  if (usePoints && profile) {
    pointsUsed = Math.min(finalPrice, profile.points);
    finalPrice -= pointsUsed;
  }

  return {
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
  };
}
