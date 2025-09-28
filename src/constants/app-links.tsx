import { 
  ActivityIcon, 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  Shield, 
  Settings, 
  DollarSign, 
  MessageSquare, 
  CreditCard, 
  FileText, 
  BarChart3, 
  TrendingUp,
  UserCheck,
  Clock,
  AlertTriangle,
  Gavel,
  CheckCircle,
  XCircle,
  Star,
  Bell,
  FileSearch,
  Filter
} from "lucide-react";

export const APP_LINKS = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    to: "/dashboard",
    isMatched: (path: string): boolean => {
      return path === "/dashboard";
    },
  },
  {
    title: "Auction Management",
    icon: Gavel,
    to: "/dashboard/auctions",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/auctions");
    },
    innerRoutes: [
      {
        title: "Auction Dashboard",
        to: "/dashboard/auctions",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions";
        },
      },
      {
        title: "Auction Requests",
        to: "/dashboard/auctions/requests",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/requests";
        },
      },
      {
        title: "Active Auctions",
        to: "/dashboard/auctions/active",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/active";
        },
      },
      {
        title: "Auction Logs",
        to: "/dashboard/auctions/logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/logs";
        },
      },
      {
        title: "Auction Reports",
        to: "/dashboard/auctions/reports",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/reports";
        },
      },
      {
        title: "Auction Notifications",
        to: "/dashboard/auctions/notifications",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/notifications";
        },
      },
      {
        title: "Auction Inquiries",
        to: "/dashboard/auctions/inquiries",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/inquiries";
        },
      },
      {
        title: "Auction Monitoring",
        to: "/dashboard/auctions/monitoring",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auctions/monitoring";
        },
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    to: "/dashboard/users",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/users");
    },
  },
  {
    title: "Admin Management",
    icon: Shield,
    to: "/dashboard/admin-accounts",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/admin-accounts") || path.startsWith("/dashboard/roles");
    },
    innerRoutes: [
      {
        title: "Admin Accounts",
        to: "/dashboard/admin-accounts",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/admin-accounts";
        },
      },
      {
        title: "Role Management",
        to: "/dashboard/roles",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/roles";
        },
      },
    ],
  },
  {
    title: "Platform Management",
    icon: Settings,
    to: "/dashboard/platform-logs",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/platform-logs") || path.startsWith("/dashboard/exchange-rates") || path.startsWith("/dashboard/system-settings");
    },
    innerRoutes: [
      {
        title: "Platform Logs",
        to: "/dashboard/platform-logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/platform-logs";
        },
      },
      {
        title: "Exchange Rates",
        to: "/dashboard/exchange-rates",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/exchange-rates";
        },
      },
      {
        title: "System Settings",
        to: "/dashboard/system-settings",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/system-settings";
        },
      },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    to: "/dashboard/messages",
    isMatched: (path: string): boolean => {
      return path === "/dashboard/messages";
    },
  },
  {
    title: "Financial",
    icon: DollarSign,
    to: "/dashboard/payment-logs",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/payment-logs") || path.startsWith("/dashboard/commissions") || path.startsWith("/dashboard/auction-payments");
    },
    innerRoutes: [
      {
        title: "Payment Logs",
        to: "/dashboard/payment-logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/payment-logs";
        },
      },
      {
        title: "Commission Reports",
        to: "/dashboard/commissions",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/commissions";
        },
      },
      {
        title: "Auction Payments",
        to: "/dashboard/auction-payments",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auction-payments";
        },
      },
      {
        title: "Payment Dashboard",
        to: "/dashboard/auction-payment-dashboard",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auction-payment-dashboard";
        },
      },
    ],
  },
  {
    title: "Audit & Security",
    icon: FileText,
    to: "/dashboard/audit-trail",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/audit-trail") || path.startsWith("/dashboard/action-logs");
    },
    innerRoutes: [
      {
        title: "Audit Trail",
        to: "/dashboard/audit-trail",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/audit-trail";
        },
      },
      {
        title: "Action Logs",
        to: "/dashboard/action-logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/action-logs";
        },
      },
    ],
  },
  {
    title: "Analytics",
    icon: BarChart3,
    to: "/dashboard/analytics",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/analytics") || path.startsWith("/dashboard/user-activity");
    },
    innerRoutes: [
      {
        title: "Platform Analytics",
        to: "/dashboard/analytics",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/analytics";
        },
      },
      {
        title: "User Activity",
        to: "/dashboard/user-activity",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/user-activity";
        },
      },
    ],
  },
  {
    title: "Legacy Pages",
    icon: AlertTriangle,
    to: "/dashboard/registration-requests",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/registration-requests") || path.startsWith("/dashboard/registration-logs") || path.startsWith("/dashboard/financial-logs") || path.startsWith("/dashboard/payment-proofs") || path.startsWith("/dashboard/auction-frauds");
    },
    innerRoutes: [
      {
        title: "Registrations",
        to: "/dashboard/registration-requests",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/registration-requests";
        },
      },
      {
        title: "Registration Logs",
        to: "/dashboard/registration-logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/registration-logs";
        },
      },
      {
        title: "Financial Logs",
        to: "/dashboard/financial-logs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/financial-logs";
        },
      },
      {
        title: "Payment Proofs",
        to: "/dashboard/payment-proofs",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/payment-proofs";
        },
      },
      {
        title: "Auction Frauds",
        to: "/dashboard/auction-frauds",
        isMatched: (path: string): boolean => {
          return path === "/dashboard/auction-frauds";
        },
      },
    ],
  },
];
