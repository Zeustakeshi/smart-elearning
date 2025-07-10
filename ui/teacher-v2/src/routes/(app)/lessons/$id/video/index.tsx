import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lessons/$id/video/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/lessons/$id/video/"!</div>;
}
