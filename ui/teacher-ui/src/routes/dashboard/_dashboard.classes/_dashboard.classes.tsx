import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/classes/_dashboard/classes"
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
