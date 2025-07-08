import { Link } from "@tanstack/react-router";
import CourseCard from "../../../../components/courses/CourseCard";
import Title from "../../../../components/ui/Title";

type Props = {};

const RecentCourses = (props: Props) => {
    return (
        <div className="my-5">
            <div className="flex justify-between items-center">
                <Title showUnderline>Khóa học gần đây </Title>
                <Link to="/courses" className="text-primary font-semibold">
                    Xem tất cả
                </Link>
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
};

export default RecentCourses;
