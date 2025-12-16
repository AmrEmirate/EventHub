"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { TransactionStatusBadge } from "@/components/ui/transaction-status-badge";
import { OrganizerTransaction } from "@/lib/apihelper";

interface TransactionsTabProps {
  transactions: OrganizerTransaction[];
  apiBaseUrl: string | undefined;
  onTransactionAction: (
    action: "approve" | "reject",
    transactionId: string
  ) => void;
}

export function TransactionsTab({
  transactions,
  apiBaseUrl,
  onTransactionAction,
}: TransactionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaksi Terbaru</CardTitle>
        <CardDescription>
          Kelola dan konfirmasi transaksi dari peserta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pembeli</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Bukti Bayar</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <TableRow key={trx.id}>
                    <TableCell>
                      <div className="font-medium">{trx.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {trx.user.email}
                      </div>
                    </TableCell>
                    <TableCell>{trx.event.name}</TableCell>
                    <TableCell>
                      <TransactionStatusBadge status={trx.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(trx.finalPrice)}
                    </TableCell>
                    <TableCell>
                      {trx.status === "PENDING_CONFIRMATION" &&
                        trx.paymentProofUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`${apiBaseUrl}${trx.paymentProofUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="mr-2 h-3.5 w-3.5" />
                              Lihat
                            </a>
                          </Button>
                        )}
                    </TableCell>
                    <TableCell>
                      {trx.status === "PENDING_CONFIRMATION" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onTransactionAction("approve", trx.id)
                            }
                          >
                            Setujui
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              onTransactionAction("reject", trx.id)
                            }
                          >
                            Tolak
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Belum ada transaksi.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
