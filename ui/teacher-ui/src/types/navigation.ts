import { SquareTerminal, Frame } from "lucide-react";

export const routeData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  items_class: [
    {
      title: "Quản lý lớp học",
      icon: SquareTerminal,
      url: "/dashboard/classes/classes",
      isActive: false,
      items: [
        { title: "Lớp học", url: "/dashboard/classes/classes" },
        { title: "Starred", url: "#" },
        { title: "Settings", url: "#" },
      ],
    },
  ],
  items: [
    {
      name: "Công cụ",
      url: "/dashboard/tools",
      icon: Frame,
    },
    {
      name: "Tài liệu",
      url: "/dashboard/documents",
      icon: Frame,
    },
    {
      name: "Chat",
      url: "/dashboard/chat",
      icon: Frame,
    },
    {
      name: "Tài khoản",
      url: "/dashboard/account",
      icon: Frame,
    },
  ],
};
