import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/course/_dashboard/course/students"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Quản lý học sinh</div>;
}
