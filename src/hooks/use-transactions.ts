import { useState, useEffect, useRef, useCallback } from "react";
import {
  getMyTransactions,
  uploadPaymentProof,
  cancelTransaction,
  Transaction,
} from "@/lib/apihelper";
import { toast } from "sonner";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyTransactions();
      setTransactions(res.data);
    } catch (error) {
      toast.error("Tidak dapat memuat riwayat transaksi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleUploadClick = useCallback((transactionId: string) => {
    setSelectedTransactionId(transactionId);
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files?.length || !selectedTransactionId) return;
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("paymentProof", file);
      setUploadingId(selectedTransactionId);
      try {
        await uploadPaymentProof(selectedTransactionId, formData);
        toast.success("Bukti pembayaran berhasil diunggah.");
        fetchTransactions();
      } catch (error) {
        toast.error("Gagal mengunggah bukti pembayaran.");
      } finally {
        setUploadingId(null);
        setSelectedTransactionId(null);
        if (event.target) event.target.value = "";
      }
    },
    [selectedTransactionId, fetchTransactions]
  );

  const handleCancelTransaction = useCallback(
    async (transactionId: string) => {
      if (!confirm("Apakah Anda yakin ingin membatalkan transaksi ini?"))
        return;
      setCancellingId(transactionId);
      try {
        await cancelTransaction(transactionId);
        toast.success("Transaksi berhasil dibatalkan.");
        fetchTransactions();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || "Gagal membatalkan transaksi."
        );
      } finally {
        setCancellingId(null);
      }
    },
    [fetchTransactions]
  );

  const pendingPaymentTransaction = transactions.find(
    (trx) => trx.status === "PENDING_PAYMENT" && trx.finalPrice > 0
  );

  return {
    transactions,
    loading,
    uploadingId,
    cancellingId,
    fileInputRef,
    pendingPaymentTransaction,
    handleUploadClick,
    handleFileChange,
    handleCancelTransaction,
  };
}
