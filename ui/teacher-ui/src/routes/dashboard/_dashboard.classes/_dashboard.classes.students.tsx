import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/classes/_dashboard/classes/students"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Quản lý học sinh</div>;
}
