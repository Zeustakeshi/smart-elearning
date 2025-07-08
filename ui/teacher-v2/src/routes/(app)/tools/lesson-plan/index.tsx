import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/tools/lesson-plan/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/tools/lesson-plan/"!</div>;
}
