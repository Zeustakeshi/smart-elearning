import { SideBar } from "@/components/module/sidebar/SideBar";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <SideBar />
    </div>
  );
}
