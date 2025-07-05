import { Bell, Gauge, Home, User2 } from "lucide-react";

export const tabs = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Dashborad", icon: Gauge, url: "/dashboard" },
  { title: "Login", icon: User2, url: "/auth/login" },
  { type: "separator" as const },
  { title: "Notifi", icon: Bell, url: "/" },
];
