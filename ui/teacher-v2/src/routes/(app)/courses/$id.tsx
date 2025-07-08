import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/courses/$id")({
    component: RouteComponent,
});

function RouteComponent() {
    const { id: courseId } = Route.useParams();
    console.log({ courseId });
    return <div>Course : {courseId}</div>;
}
