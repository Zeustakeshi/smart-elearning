import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lessons/$id/documents/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Tại liệu học tập</div>;
}
