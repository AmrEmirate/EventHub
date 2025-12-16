import { useState, useEffect, useCallback } from "react";
import {
  getEventBySlug,
  getMyTransactions,
  EventWithReviews,
  Transaction,
} from "@/lib/apihelper";
import { useAuth } from "@/context/AuthContext";

export function useEventDetail(slug: string | undefined) {
  const [event, setEvent] = useState<EventWithReviews | null>(null);
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user, isAuthenticated } = useAuth();

  const fetchData = useCallback(async () => {
    if (typeof slug !== "string") {
      setError("URL event tidak valid.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const eventRes = await getEventBySlug(slug);
      setEvent(eventRes.data);
      if (isAuthenticated) {
        const transactionRes = await getMyTransactions();
        setUserTransactions(transactionRes.data);
      }
    } catch (err) {
      setError("Event yang Anda cari tidak dapat ditemukan.");
    } finally {
      setLoading(false);
    }
  }, [slug, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const canReview =
    isAuthenticated &&
    event &&
    userTransactions.some(
      (trx) => trx.event.id === event.id && trx.status === "COMPLETED"
    );

  const hasReviewed = event?.reviews.some(
    (review) => review.user.name === user?.name
  );

  return {
    event,
    loading,
    error,
    canReview,
    hasReviewed,
    refetch: fetchData,
  };
}
