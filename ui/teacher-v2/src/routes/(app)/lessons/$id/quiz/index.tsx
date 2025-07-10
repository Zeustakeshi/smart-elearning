import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lessons/$id/quiz/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Thống kê số lượng và kết quả bài kiểm tra</div>;
}
