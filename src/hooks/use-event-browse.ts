import { useState, useEffect, useCallback } from "react";
import { getEvents, Event } from "@/lib/apihelper";
import { useDebounce } from "@/hooks/use-debounce";

interface EventFilters {
  searchTerm: string;
  selectedCategory: string;
  selectedLocation: string;
  startDate: string;
  endDate: string;
}

export function useEventBrowse() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({
    searchTerm: "",
    selectedCategory: "All",
    selectedLocation: "All",
    startDate: "",
    endDate: "",
  });

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params: { [key: string]: string } = {};
    if (debouncedSearchTerm) params.search = debouncedSearchTerm;
    if (filters.selectedCategory !== "All")
      params.category = filters.selectedCategory;
    if (filters.selectedLocation !== "All")
      params.location = filters.selectedLocation;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;

    try {
      const response = await getEvents(params);
      setEvents(response.data);
    } catch (err) {
      setError("Tidak dapat memuat event saat ini. Coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearchTerm,
    filters.selectedCategory,
    filters.selectedLocation,
    filters.startDate,
    filters.endDate,
  ]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const setSearchTerm = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, searchTerm: value }));
  }, []);

  const setSelectedCategory = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, selectedCategory: value }));
  }, []);

  const setSelectedLocation = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, selectedLocation: value }));
  }, []);

  const setStartDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, startDate: value }));
  }, []);

  const setEndDate = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, endDate: value }));
  }, []);

  return {
    events,
    loading,
    error,
    searchTerm: filters.searchTerm,
    selectedCategory: filters.selectedCategory,
    selectedLocation: filters.selectedLocation,
    startDate: filters.startDate,
    endDate: filters.endDate,
    setSearchTerm,
    setSelectedCategory,
    setSelectedLocation,
    setStartDate,
    setEndDate,
  };
}
