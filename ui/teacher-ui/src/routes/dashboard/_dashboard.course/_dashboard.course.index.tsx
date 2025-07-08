import { MyClassroom } from "@/components/module/MyClassroom/MyClassroom";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboard/course/_dashboard/course/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <MyClassroom />
    </div>
  );
}
