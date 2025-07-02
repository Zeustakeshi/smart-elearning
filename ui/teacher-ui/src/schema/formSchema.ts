import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  password: z.string().min(1, {
    message: "Vui lòng nhập mật khẩu.",
  }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email không hợp lệ.",
  }),
  username: z
    .string()
    .min(1, {
      message: "Vui lòng nhập username",
    })
    .max(30, {
      message: "username không được vượt quá 30 ký tự.",
    }),
  password: z.string().min(1, {
    message: "Vui lòng nhập mật khẩu.",
  }),
  role: z.enum(["STUDENT", "TEACHER"], {
    required_error: "Vui lòng chọn vai trò của bạn.",
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
