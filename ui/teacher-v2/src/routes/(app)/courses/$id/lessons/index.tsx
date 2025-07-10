import { createFileRoute } from "@tanstack/react-router";
import LessonList from "./-components/LessonList";
import LessonSearch from "./-components/LessonSearch";

export const Route = createFileRoute("/(app)/courses/$id/lessons/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <LessonSearch></LessonSearch>
            <LessonList></LessonList>
        </div>
    );
}
