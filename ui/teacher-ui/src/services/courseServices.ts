import { api } from "@/config/axios";
import type { CourseCardProps } from "@/types/course.data";

// Lấy danh sách khóa học (không cần token)
export const getCourses = async (): Promise<CourseCardProps[]> => {
  try {
    const response = await api.get("/teacher/courses");
    const data = response.data.data;
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách khóa học:", error);
    return [];
  }
};
