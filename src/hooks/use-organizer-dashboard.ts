import { useState, useEffect, useCallback } from "react";
import {
  getOrganizerDashboard,
  approveTransaction,
  rejectTransaction,
  deleteEvent,
  getOrganizerTransactions,
  getMyOrganizerEvents,
  OrganizerDashboardData,
  OrganizerTransaction,
  Event,
} from "@/lib/apihelper";
import { toast } from "sonner";

export function useOrganizerDashboard() {
  const [dashboardData, setDashboardData] =
    useState<OrganizerDashboardData | null>(null);
  const [transactions, setTransactions] = useState<OrganizerTransaction[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const [dashboardRes, transactionsRes, eventsRes] = await Promise.all([
        getOrganizerDashboard(month, year),
        getOrganizerTransactions(),
        getMyOrganizerEvents(),
      ]);
      setDashboardData(dashboardRes.data);
      setTransactions(transactionsRes.data);
      setMyEvents(eventsRes.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Tidak dapat memuat data.");
    } finally {
      setLoading(false);
    }
  }, [currentDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleMonthChange = useCallback((increment: number) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  }, []);

  const handleTransactionAction = useCallback(
    async (action: "approve" | "reject", transactionId: string) => {
      try {
        await (action === "approve"
          ? approveTransaction(transactionId)
          : rejectTransaction(transactionId));
        toast.success(
          `Transaksi berhasil di${action === "approve" ? "setujui" : "tolak"}.`
        );
        fetchData();
      } catch (error) {
        toast.error(`Gagal ${action} transaksi.`);
      }
    },
    [fetchData]
  );

  const handleDeleteEvent = useCallback(async () => {
    if (!selectedEventId) return;
    try {
      await deleteEvent(selectedEventId);
      toast.success("Event berhasil dihapus.");
      fetchData();
    } catch (error) {
      toast.error("Gagal menghapus event.");
    } finally {
      setShowDeleteDialog(false);
      setSelectedEventId(null);
    }
  }, [selectedEventId, fetchData]);

  const handleDeleteClick = useCallback((eventId: string) => {
    setSelectedEventId(eventId);
    setShowDeleteDialog(true);
  }, []);

  return {
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
  };
}
