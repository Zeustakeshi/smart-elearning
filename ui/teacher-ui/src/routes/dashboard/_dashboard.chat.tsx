import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/chat")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Chat AI</div>;
}
