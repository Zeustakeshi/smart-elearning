import { MOCK_ACTIVITIES, MOCK_CLASSES, MOCK_STATS } from "@/types/dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { RecentActivitySection } from "./RecentActivitySection";
import { StatsSection } from "./StatsSection";
import { UpcomingClassesSection } from "./UpcomingClassesSection";
import { useEffect, useState } from "react";
import type { User } from "@/types/auth";

import { fetchUserInfo } from "@/services/authServices";

export const TeacherDashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchUserInfo();
        console.log("user", res.data.data);
        if (res) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi parse user từ cookie hoặc khi fetch:", error);
      }
    };
    getUser();
  }, []);
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:p-8 bg-gray-50/90">
      <DashboardHeader teacherName={user?.username || ""} />

      <StatsSection stats={MOCK_STATS} />

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <UpcomingClassesSection classes={MOCK_CLASSES} />
        <RecentActivitySection activities={MOCK_ACTIVITIES} />
      </div>
    </main>
  );
};
