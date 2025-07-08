import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/tools/discussion-question/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/tools/discussion-question/"!</div>;
}
