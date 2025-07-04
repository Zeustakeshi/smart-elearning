import { MOCK_ACTIVITIES, MOCK_CLASSES, MOCK_STATS } from "@/types/dashboard";
import { DashboardHeader } from "./DashboardHeader";
import { RecentActivitySection } from "./RecentActivitySection";
import { StatsSection } from "./StatsSection";
import { UpcomingClassesSection } from "./UpcomingClassesSection";

export const TeacherDashboardPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:p-8 bg-gray-50/90">
      <DashboardHeader teacherName="Thầy Tuấn" />

      <StatsSection stats={MOCK_STATS} />

      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <UpcomingClassesSection classes={MOCK_CLASSES} />
        <RecentActivitySection activities={MOCK_ACTIVITIES} />
      </div>
    </main>
  );
};
