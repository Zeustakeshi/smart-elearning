import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Trang Quản Lý Lớp Học </h1>
    </div>
  );
}
