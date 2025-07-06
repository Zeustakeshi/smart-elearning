import { InterfaceCourse } from "@/components/module/course/InterfaceCourse";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/course/_dashboard/course/list"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <InterfaceCourse />
    </div>
  );
}
