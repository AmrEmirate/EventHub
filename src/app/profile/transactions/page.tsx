"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Upload, ArrowLeft, Eye, X } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import { TransactionStatusBadge } from "@/components/ui/transaction-status-badge";
import CountdownTimer from "@/components/ui/countdown-timer";
import PaymentInstructions from "../components/payment-instructions";
import { useTransactions } from "@/hooks/use-transactions";

export default function TransactionsPage() {
  const {
    transactions,
    loading,
    uploadingId,
    cancellingId,
    fileInputRef,
    pendingPaymentTransaction,
    handleUploadClick,
    handleFileChange,
    handleCancelTransaction,
  } = useTransactions();

  return (
    <div className="container mx-auto py-8 px-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload bukti pembayaran"
      />
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link href="/profile">
            <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Profil
          </Link>
        </Button>
      </div>
      {pendingPaymentTransaction && (
        <PaymentInstructions transaction={pendingPaymentTransaction} />
      )}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Riwayat Transaksi Saya</CardTitle>
          <CardDescription>
            Lihat dan kelola semua transaksi event Anda di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((trx) => (
                      <TableRow key={trx.id}>
                        <TableCell className="font-medium">
                          {trx.event.name}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(trx.finalPrice)}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1 items-start">
                            <TransactionStatusBadge status={trx.status} />
                            {trx.status === "PENDING_PAYMENT" &&
                              trx.finalPrice > 0 && (
                                <CountdownTimer
                                  deadline={trx.paymentDeadline}
                                />
                              )}
                          </div>
                        </TableCell>
                        <TableCell>{formatDate(trx.createdAt)}</TableCell>
                        <TableCell className="text-center">
                          {trx.status === "COMPLETED" ? (
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/profile/transactions/${trx.id}`}>
                                <Eye className="h-4 w-4 mr-2" />
                                Lihat Tiket
                              </Link>
                            </Button>
                          ) : trx.status === "PENDING_PAYMENT" &&
                            trx.finalPrice > 0 ? (
                            <div className="flex gap-2 justify-center">
                              <Button
                                size="sm"
                                onClick={() => handleUploadClick(trx.id)}
                                disabled={
                                  uploadingId === trx.id ||
                                  cancellingId === trx.id
                                }
                              >
                                {uploadingId === trx.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <Upload className="h-4 w-4 mr-2" />
                                )}
                                Upload
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleCancelTransaction(trx.id)}
                                disabled={
                                  uploadingId === trx.id ||
                                  cancellingId === trx.id
                                }
                              >
                                {cancellingId === trx.id ? (
                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4 mr-2" />
                                )}
                                Batal
                              </Button>
                            </div>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        Tidak ada riwayat transaksi.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
