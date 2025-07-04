import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/course/_dashboard/course"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
