import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/tools")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Trang công cụ AI</div>;
}
