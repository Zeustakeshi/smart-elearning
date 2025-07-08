import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/tools/multiple-choice-quiz/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(app)/tools/multiple-choice-quiz/"!</div>;
}
