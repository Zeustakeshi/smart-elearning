import { api } from "@/lib/api";
import type { CreateCourseSchemaType } from "@/schemas/createCourse.schema";
import type { CourseCreateResponse } from "./response/course.type";

export const createCourse = async (
  data: CreateCourseSchemaType
): Promise<CourseCreateResponse> => {
  return await api.post("/courses", data);
};
