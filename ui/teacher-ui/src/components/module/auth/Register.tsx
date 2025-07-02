import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AuthForm } from "./AuthForm";
import { registerSchema, type RegisterSchema } from "@/schema/formSchema";
import { register } from "@/services/authServices";

export const Register = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      const response = await register(values);
      console.log("Registration values:", response);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      title="Đăng ký tài khoản"
      description="Nhập thông tin của bạn để tạo tài khoản mới."
      submitButtonText="Đăng ký"
      footerContent={
        <div className="mt-4 text-center text-sm">
          Bạn đã có tài khoản?{" "}
          <a href="/auth/login" className="underline underline-offset-4">
            Đăng nhập ngay
          </a>
        </div>
      }
      className={className}
      {...props}
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tên người dùng</FormLabel>
            <FormControl>
              <Input placeholder="vi du: minhhieu" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="m@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mật khẩu</FormLabel>
            <FormControl>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} {...field} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Bạn là?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex space-x-4"
              >
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="STUDENT" />
                  </FormControl>
                  <FormLabel className="font-normal">Sinh viên</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <RadioGroupItem value="TEACHER" />
                  </FormControl>
                  <FormLabel className="font-normal">Giảng viên</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="outline" className="w-full" type="button">
        Đăng ký với Google
      </Button>
    </AuthForm>
  );
};
