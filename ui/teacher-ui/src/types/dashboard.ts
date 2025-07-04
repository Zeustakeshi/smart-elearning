export interface DashboardHeaderProps {
  teacherName: string;
}

export type StatCardData = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export type UpcomingClassData = {
  time: string;
  className: string;
  subject: string;
  status: "Sắp diễn ra" | "Đang diễn ra";
};

export type Student = {
  name: string;
  avatarUrl?: string;
};

export type RecentActivityData = {
  student: Student;
  action: string;
  target: string;
  time: string;
};

// Mock data for the dashboard
export const MOCK_TEACHER_NAME = "Thầy Tuấn";
import React from "react";
import { Users, CalendarDays, PencilLine } from "lucide-react";

export const MOCK_STATS: StatCardData[] = [
  {
    title: "Tổng số học sinh",
    value: "125",
    icon: React.createElement(Users, { className: "h-6 w-6 text-gray-500" }),
  },
  {
    title: "Lớp học hôm nay",
    value: "4",
    icon: React.createElement(CalendarDays, {
      className: "h-6 w-6 text-gray-500",
    }),
  },
  {
    title: "Bài cần chấm",
    value: "18",
    icon: React.createElement(PencilLine, {
      className: "h-6 w-6 text-gray-500",
    }),
  },
];

export const MOCK_CLASSES: UpcomingClassData[] = [
  {
    time: "08:00 - 09:30",
    className: "Lớp 10A1",
    subject: "Toán học - Đại số",
    status: "Sắp diễn ra",
  },
  {
    time: "10:00 - 11:30",
    className: "Lớp 11B2",
    subject: "Vật lý - Cơ học",
    status: "Đang diễn ra",
  },
  {
    time: "14:00 - 15:30",
    className: "Lớp 12C3",
    subject: "Hóa học - Hữu cơ",
    status: "Sắp diễn ra",
  },
];

export const MOCK_ACTIVITIES: RecentActivityData[] = [
  {
    student: {
      name: "Nguyễn Văn A",
      avatarUrl: "https://github.com/shadcn.png",
    },
    action: "vừa nộp bài tập",
    target: "Chương 3: Tích phân",
    time: "5 phút trước",
  },
  {
    student: { name: "Trần Thị B", avatarUrl: "https://github.com/vercel.png" },
    action: "đã đặt một câu hỏi trong",
    target: "Bài giảng tuần 5",
    time: "1 giờ trước",
  },
  {
    student: { name: "Lê Văn C" },
    action: "vừa hoàn thành bài kiểm tra",
    target: "Kiểm tra 15 phút",
    time: "3 giờ trước",
  },
];
