import z from "zod";

const UsernameSchema = z
    .string({ required_error: "Tên đăng nhập không được để trống" })
    .min(5, { message: "Tên đăng nhập phải từ 5 đến 20 ký tự" })
    .max(20, { message: "Tên đăng nhập phải từ 5 đến 20 ký tự" })
    .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới",
    });

const PasswordSchema = z
    .string({ required_error: "Mật khẩu không được để trống" })
    .min(8, { message: "Mật khẩu phải từ 8 đến 30 ký tự" })
    .max(30, { message: "Mật khẩu phải từ 8 đến 30 ký tự" })
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        {
            message:
                "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
        }
    );
export const CreateAccountSchema = z
    .object({
        fullName: z
            .string({ required_error: "Họ và tên không được để trống" })
            .min(5, { message: "Họ và tên phải từ 5 đến 50 ký tự" })
            .max(50, { message: "Họ và tên phải từ 5 đến 50 ký tự" }),
        username: UsernameSchema,
        email: z
            .string({ required_error: "Email không được để trống" })
            .email({ message: "Email không hợp lệ" }),
        password: PasswordSchema,
        confirmPassword: z.string({
            required_error: "Xác nhận mật khẩu không được để trống",
        }),
        phone: z
            .string({ required_error: "Số điện thoại không được để trống" })
            .regex(
                /^(?:\+84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}$/,
                { message: "Số điện thoại không hợp lệ" }
            ),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirmPassword"],
    });

export const LoginSchema = z.object({
    username: UsernameSchema,
    password: PasswordSchema,
});

export type CreateAccountValueType = z.infer<typeof CreateAccountSchema>;
export type LoginValueType = z.infer<typeof LoginSchema>;
