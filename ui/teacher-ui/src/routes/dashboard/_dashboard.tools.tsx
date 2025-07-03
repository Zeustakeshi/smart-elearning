
import SupportTools from "@/components/module/tools/SupportTools";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/tools")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>
    <SupportTools></SupportTools>
  </div>;
}
