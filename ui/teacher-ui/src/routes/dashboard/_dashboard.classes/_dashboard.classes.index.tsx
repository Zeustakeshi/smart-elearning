import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/classes/_dashboard/classes/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/dashboard/classes/classes/students">đến quản lý học sinh</Link>
    </div>
  );
}
