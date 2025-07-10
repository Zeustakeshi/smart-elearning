import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/courses/$id/documents/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Bạn chưa có tài liệu nào để hiển thị</div>;
}
