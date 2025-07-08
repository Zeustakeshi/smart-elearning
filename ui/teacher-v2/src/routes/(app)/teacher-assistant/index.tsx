import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/teacher-assistant/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/teacher-assistant/"!</div>;
}
