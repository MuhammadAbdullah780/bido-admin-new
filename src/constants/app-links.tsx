import { ActivityIcon, LayoutDashboard, Users } from "lucide-react";

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
];
