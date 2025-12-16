export interface SimpleMessageResponse {
  message: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  referralCode: string | null;
  phone: string | null;
  profile: {
    bio: string | null;
    avatarUrl: string | null;
  } | null;
  role: "CUSTOMER" | "ORGANIZER";
}

export interface LoginResponse {
  token: string;
  user: UserProfile;
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  isFree: boolean;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  ticketTotal: number;
  ticketSold: number;
  imageUrl?: string | null;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  imageUrl?: string | null;
  user: {
    name: string;
    profile?: {
      avatarUrl: string | null;
    } | null;
  };
  createdAt: string;
}

export interface EventWithReviews extends Event {
  reviews: Review[];
  organizer?: {
    name: string;
    profile?: {
      avatarUrl: string | null;
    } | null;
  };
}

export interface PointPrize {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
}

export interface Voucher {
  id: string;
  code: string;
  discountPercent: number;
  expiresAt: string;
  maxDiscount?: number | null;
  event?: {
    name: string;
  } | null;
}

export interface Transaction {
  id: string;
  status:
    | "PENDING_PAYMENT"
    | "COMPLETED"
    | "CANCELLED"
    | "EXPIRED"
    | "REJECTED"
    | "PENDING_CONFIRMATION";
  totalPrice: number;
  finalPrice: number;
  createdAt: string;
  paymentDeadline: string;
  paymentProofUrl?: string | null;
  event: {
    id: string;
    name: string;
    slug: string;
    startDate: string;
    location?: string;
  };
  user: {
    name: string;
    email: string;
  };
}

export interface OrganizerDashboardData {
  totalRevenue: number;
  totalEvents: number;
  totalTicketsSold: number;
  pendingTransactions: number;
  analytics: {
    revenuePerDay: { date: string; total: number }[];
    ticketsPerEvent: { eventName: string; sold: number }[];
  };
}

export interface OrganizerTransaction extends Transaction {
  user: {
    name: string;
    email: string;
  };
}

export interface Attendee {
  user: {
    name: string;
    email: string;
  };
  quantity: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
