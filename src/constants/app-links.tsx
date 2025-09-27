import { ActivityIcon, LayoutDashboard, UserPlus, Users } from "lucide-react";

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
    title: "Users",
    icon: Users,
    to: "/dashboard/users",
    isMatched: (path: string): boolean => {
      return path.startsWith("/dashboard/users");
    },
  },
  {
    title: "Action Logs",
    icon: ActivityIcon,
    to: "/dashboard/action-logs",
    isMatched: (path: string): boolean => {
      return path === "/dashboard/action-logs";
    },
  },
  {
    title: "Registrations",
    icon: UserPlus,
    to: "/dashboard/registration-requests",
    isMatched: (path: string): boolean => {
      return path === "/dashboard/registration-requests";
    },
  },
  {
    title: "Registration Logs",
    icon: ActivityIcon,
    to: "/dashboard/registration-logs",
    isMatched: (path: string): boolean => {
      return path === "/dashboard/registration-logs";
    },
  },
  {
    title: "Financial Logs",
    icon: ActivityIcon,
    to: "/dashboard/financial-logs",
    isMatched: (path: string): boolean => {
      return path === "/dashboard/financial-logs";
    },
  },
];
