"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import React from "react";

export type TransactionStatus =
  | "COMPLETED"
  | "PENDING_CONFIRMATION"
  | "PENDING_PAYMENT"
  | "REJECTED"
  | "CANCELLED"
  | "EXPIRED";

interface TransactionStatusBadgeProps {
  status: TransactionStatus;
}

const statusMap: Record<
  TransactionStatus,
  { className: string; icon: React.ElementType; text: string }
> = {
  COMPLETED: {
    className: "bg-green-100 text-green-800",
    icon: CheckCircle,
    text: "Selesai",
  },
  PENDING_CONFIRMATION: {
    className: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    text: "Menunggu Konfirmasi",
  },
  PENDING_PAYMENT: {
    className: "bg-blue-100 text-blue-800",
    icon: Clock,
    text: "Menunggu Pembayaran",
  },
  REJECTED: {
    className: "bg-red-100 text-red-800",
    icon: XCircle,
    text: "Ditolak",
  },
  CANCELLED: {
    className: "bg-gray-100 text-gray-800",
    icon: XCircle,
    text: "Dibatalkan",
  },
  EXPIRED: {
    className: "bg-orange-100 text-orange-800",
    icon: Clock,
    text: "Kedaluwarsa",
  },
};

export function TransactionStatusBadge({
  status,
}: TransactionStatusBadgeProps) {
  const {
    className,
    icon: Icon,
    text,
  } = statusMap[status] || statusMap.CANCELLED;

  return (
    <Badge variant="outline" className={`border-0 ${className}`}>
      <Icon className="h-3.5 w-3.5 mr-1.5" />
      {text}
    </Badge>
  );
}
