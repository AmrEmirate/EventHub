"use client";

import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Ticket,
  Plus,
  Loader2,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TransactionsTab } from "@/components/dashboard/TransactionsTab";
import { EventsTab } from "@/components/dashboard/EventsTab";
import { AnalyticsTab } from "@/components/dashboard/AnalyticsTab";
import { StatCard } from "@/components/dashboard/StatCard";
import { useOrganizerDashboard } from "@/hooks/use-organizer-dashboard";

export default function OrganizerDashboard() {
  const {
    dashboardData,
    transactions,
    myEvents,
    loading,
    error,
    currentDate,
    showDeleteDialog,
    setShowDeleteDialog,
    handleMonthChange,
    handleTransactionAction,
    handleDeleteEvent,
    handleDeleteClick,
  } = useOrganizerDashboard();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "");

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Organizer</h1>
            <p className="text-muted-foreground">
              Kelola event dan transaksi Anda.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/organizer/create-voucher">
              <Button variant="outline">
                <Tag className="mr-2 h-4 w-4" />
                Buat Voucher
              </Button>
            </Link>
            <Link href="/organizer/create-event">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Buat Event
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleMonthChange(-1)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleMonthChange(1)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Pendapatan"
            value={formatPrice(dashboardData?.totalRevenue ?? 0)}
            icon={DollarSign}
          />
          <StatCard
            title="Total Event"
            value={String(dashboardData?.totalEvents ?? 0)}
            icon={Calendar}
          />
          <StatCard
            title="Tiket Terjual"
            value={String(dashboardData?.totalTicketsSold ?? 0)}
            icon={Ticket}
          />
          <StatCard
            title="Transaksi Pending"
            value={String(dashboardData?.pendingTransactions ?? 0)}
            icon={Calendar}
          />
        </div>

        <Tabs defaultValue="transactions">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="transactions">Transaksi</TabsTrigger>
            <TabsTrigger value="events">Event Saya</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
          </TabsList>
          <TabsContent value="transactions">
            <TransactionsTab
              transactions={transactions}
              apiBaseUrl={API_BASE_URL}
              onTransactionAction={handleTransactionAction}
            />
          </TabsContent>
          <TabsContent value="events">
            <EventsTab events={myEvents} onDeleteClick={handleDeleteClick} />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab dashboardData={dashboardData} />
          </TabsContent>
        </Tabs>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Hapus Event?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin ingin
                menghapus event ini?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteEvent}>
                Hapus
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
