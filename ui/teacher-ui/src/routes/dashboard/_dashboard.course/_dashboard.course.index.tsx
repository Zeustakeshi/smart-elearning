import { createFileRoute, Link } from "@tanstack/react-router";
import { InterfaceCourse } from "@/components/module/course/InterfaceCourse";


export const Route = createFileRoute(
  "/dashboard/_dashboard/course/_dashboard/course/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <InterfaceCourse/>
      <Link to="/dashboard/course/course/students">đến quản lý học sinh</Link>
    </div>
  );
}
