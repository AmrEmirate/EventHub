import axios from "axios";
import {
  SimpleMessageResponse,
  UserProfile,
  LoginResponse,
  Event,
  EventWithReviews,
  PointPrize,
  Voucher,
  Transaction,
  OrganizerDashboardData,
  OrganizerTransaction,
  Attendee,
  Notification,
} from "./types";

export type {
  UserProfile,
  Event,
  Review,
  EventWithReviews,
  PointPrize,
  Voucher,
  Transaction,
  OrganizerDashboardData,
  OrganizerTransaction,
  Attendee,
  Notification,
} from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export const login = (data: any) =>
  api.post<LoginResponse>("/auth/login", data);
export const register = (data: any) =>
  api.post<SimpleMessageResponse>("/auth/register", data);
export const verifyEmail = (token: string) =>
  api.get<SimpleMessageResponse>(`/auth/verify-email?token=${token}`);
export const forgotPassword = (email: string) =>
  api.post<SimpleMessageResponse>("/auth/forgot-password", { email });
export const resetPassword = (data: { token: string; newPassword: string }) =>
  api.post<SimpleMessageResponse>("/auth/reset-password", data);

export const getMyProfile = () => api.get<UserProfile>("/users/me");
export const updateMyProfile = (data: {
  name?: string;
  bio?: string;
  phone?: string;
}) => api.put<{ message: string; data: UserProfile }>("/users/me", data);
export const changePassword = (data: any) =>
  api.put<SimpleMessageResponse>("/users/me/change-password", data);
export const updateMyAvatar = (avatarData: FormData) => {
  return api.put("/users/me/avatar", avatarData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getEvents = (params?: any) =>
  api.get<Event[]>("/events", { params });
export const getEventBySlug = (slug: string) =>
  api.get<EventWithReviews>(`/events/${slug}`);
export const getEventById = (eventId: string) =>
  api.get<Event>(`/events/id/${eventId}`);
export const getMyOrganizerEvents = () =>
  api.get<Event[]>("/events/organizer/my-events");
export const createEvent = (data: FormData) => {
  return api.post("/events", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateEvent = (eventId: string, data: any) =>
  api.put(`/events/${eventId}`, data);
export const deleteEvent = (eventId: string) =>
  api.delete(`/events/${eventId}`);

export const getMyVouchers = () => api.get<Voucher[]>("/vouchers/me");
export const createOrganizerVoucher = (data: any) =>
  api.post("/vouchers/organizer", data);

export const getMyTransactions = () =>
  api.get<Transaction[]>("/transactions/me");
export const createTransaction = (data: {
  eventId: string;
  quantity: number;
  voucherCode?: string;
  usePoints?: boolean;
}) => api.post("/transactions", data);
export const getTransactionById = (transactionId: string) =>
  api.get<Transaction>(`/transactions/${transactionId}`);

export const createReview = (data: FormData) => {
  return api.post("/reviews", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getEventReviews = (eventId: string) =>
  api.get(`/reviews/${eventId}`);

export const getMyNotifications = () =>
  api.get<Notification[]>("/notifications/me");
export const markNotificationsAsRead = () =>
  api.post("/notifications/me/mark-as-read");

export const getOrganizerTransactions = () =>
  api.get<OrganizerTransaction[]>("/transactions/organizer");
export const approveTransaction = (transactionId: string) =>
  api.post(`/transactions/organizer/${transactionId}/approve`);
export const rejectTransaction = (transactionId: string) =>
  api.post(`/transactions/organizer/${transactionId}/reject`);
export const getEventAttendees = (eventId: string) =>
  api.get<Attendee[]>(`/events/${eventId}/attendees`);

export const getOrganizerDashboard = (month: number, year: number) => {
  return api.get<OrganizerDashboardData>("/dashboard", {
    params: { month, year },
  });
};

export const uploadPaymentProof = (
  transactionId: string,
  proofData: FormData
) => {
  return api.post(`/transactions/${transactionId}/upload`, proofData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getPointPrizes = () => api.get<PointPrize[]>("/rewards/prizes");
export const redeemPointPrize = (prizeId: string) =>
  api.post(`/rewards/redeem/${prizeId}`);

export const cancelTransaction = (transactionId: string) =>
  api.post(`/transactions/${transactionId}/cancel`);
