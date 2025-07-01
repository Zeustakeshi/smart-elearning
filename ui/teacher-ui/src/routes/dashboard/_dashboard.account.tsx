import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Tài Khoản</div>;
}
