import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/documents")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Tài liệu</div>;
}
