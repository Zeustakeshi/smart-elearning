import { createFileRoute } from "@tanstack/react-router";
import CourseCard from "../../../components/courses/CourseCard";
import Button from "../../../components/ui/Button";
import Title from "../../../components/ui/Title";

export const Route = createFileRoute("/(app)/courses/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full h-full">
            <div className="w-full flex justify-between items-center gap-2">
                <Title>Khóa học của bạn</Title>
                <Button to="/courses/new">Thêm khóa học</Button>
            </div>
            <div
                className="grid gap-5 mt-8"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                }}
            >
                {new Array(8).fill(0).map((_, index) => (
                    <CourseCard key={index}></CourseCard>
                ))}
            </div>
        </div>
    );
}
