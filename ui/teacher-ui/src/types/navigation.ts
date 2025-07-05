import { SquareTerminal, Bot, Folder, User, MessageCircle } from "lucide-react";

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
      icon: Bot,
    },
    {
      name: "Tài liệu",
      url: "/dashboard/documents",
      icon: Folder,
    },
    {
      name: "Chat",
      url: "/dashboard/chat",
      icon: MessageCircle,
    },
    {
      name: "Tài khoản",
      url: "/dashboard/account",
      icon: User,
    },
  ],
};
