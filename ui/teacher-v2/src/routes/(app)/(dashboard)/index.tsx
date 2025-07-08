import { createFileRoute } from "@tanstack/react-router";
import Banner from "./-components/Banner";
import RecentCourses from "./-components/RecentCourses";
import RecentTools from "./-components/RecentTools";

export const Route = createFileRoute("/(app)/(dashboard)/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Banner></Banner>
            <RecentTools></RecentTools>
            <RecentCourses></RecentCourses>
        </div>
    );
}
