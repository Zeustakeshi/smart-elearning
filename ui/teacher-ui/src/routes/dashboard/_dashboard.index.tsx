import { TeacherDashboardPage } from "@/components/module/dashboard-landing/TeacherDashboardPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TeacherDashboardPage />
    </div>
  );
}
