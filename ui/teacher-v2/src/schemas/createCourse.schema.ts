import { z } from "zod";

export const CreateCourseSchema = z.object({
    name: z
        .string()
        .min(5, { message: "Tên khóa học quá ngắn" })
        .max(200, { message: "Tên khóa học quá dài" }),

    description: z.optional(
        z
            .string()
            .min(5, { message: "Mô tả quá ngắn" })
            .max(2000, { message: "Mô tả quá dài" })
    ),
    visibility: z.enum(["PUBLIC", "PRIVATE", "LINK_ONLY"]),
});

export type CreateCourseSchemaType = z.infer<typeof CreateCourseSchema>;
