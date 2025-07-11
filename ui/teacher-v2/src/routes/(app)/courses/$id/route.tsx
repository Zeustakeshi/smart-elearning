import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import Title from "../../../../components/ui/Title";
import { cn } from "../../../../lib/utils";
import CourseBanner from "./-components/CourseBanner";
import CourseDecription from "./-components/CourseDecription";

export const Route = createFileRoute("/(app)/courses/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id: courseId } = Route.useParams();
  console.log({ courseId });
  return (
    <div className="size-full flex flex-col space-y-6">
      <CourseBanner />
      <CourseDecription
        value={` Khóa học Toán 12 giúp học sinh hệ thống hóa kiến thức, rèn luyện kỹ năng giải bài tập và chuẩn bị tốt nhất cho kỳ thi tốt nghiệp THPT. Nội dung bao gồm các chuyên đề Đại số, Hình học, Tổ hợp - Xác suất, Giải tích, bám sát chương trình SGK và đề thi minh họa của Bộ Giáo dục. Khóa học cung cấp bài giảng chi tiết, ví dụ minh họa, bài tập tự luyện và hỗ trợ giải đáp thắc mắc, giúp học sinh tự tin đạt kết quả cao trong kỳ thi quan trọng này.`}
      />
      <div className="mt-5">
        <Title className="mb-6">Nội dung khóa học</Title>
        <div className="flex justify-start items-center gap-5 my-3">
          <Link
            activeProps={{
              className:
                "!border-b-primary text-primary transition-all font-semibold",
            }}
            activeOptions={{
              exact: true,
            }}
            className={cn(
              "text-lg border-b-3  border-b-transparent hover:text-primary transition-all hover:font-semibold"
            )}
            to="/courses/$id/lessons"
            params={{ id: courseId }}
          >
            Bài học
          </Link>
          <Link
            activeProps={{
              className:
                "!border-b-primary text-primary transition-all font-semibold",
            }}
            activeOptions={{
              exact: true,
            }}
            className={cn(
              "text-lg border-b-3 border-b-transparent hover:text-primary transition-all hover:font-semibold"
            )}
            to="/courses/$id/documents"
            params={{ id: courseId }}
          >
            Tài liệu
          </Link>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
