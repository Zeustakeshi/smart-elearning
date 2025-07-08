import { useEffect, useState } from "react";
import { CardCourse } from "@/components/ui/card_course";
import type { CourseCardProps } from "@/types/course.data";
import { getCourses } from "@/services/courseServices";

export const InterfaceCourse = () => {
  const [courses, setCourses] = useState<CourseCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải khóa học...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500 italic font-bold text-lg">
          Không có khóa học nào.
        </p>
      ) : (
        <div className="w-auto flex flex-wrap gap-9 justify-between mx-auto">
          {courses.map((course, index) => (
            <CardCourse key={index} {...course} />
          ))}
        </div>
      )}
    </div>
  );
};
