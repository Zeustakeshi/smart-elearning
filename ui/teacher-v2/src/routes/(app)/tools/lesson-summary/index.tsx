import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/tools/lesson-summary/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/tools/lesson-summary/"!</div>;
}
