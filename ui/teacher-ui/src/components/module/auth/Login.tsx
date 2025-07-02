import { Input } from "@/components/ui/input";
import { loginSchema, type LoginSchema } from "@/schema/formSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { login } from "@/services/authServices";
import { AuthForm } from "./AuthForm";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    try {
      const response = await login(values);
      console.log("Đăng nhập thành công:", response);
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      toast.error("Lỗi đăng nhập");
    }
  }

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      title="Đăng nhập"
      description="Nhập email và mật khẩu để vào tài khoản của bạn."
      submitButtonText="Đăng nhập"
      footerContent={
        <div className="mt-4 text-center text-sm">
          Bạn chưa có tài khoản?{" "}
          <a href="/auth/register" className="underline underline-offset-4">
            Đăng ký ngay
          </a>
        </div>
      }
      className={className}
      {...props}
    >
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
            <div className="flex items-center">
              <FormLabel>Mật khẩu</FormLabel>
              <a
                href="/forgot-password"
                className="ml-auto inline-block text-sm underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <FormControl>
              <div className="relative">
                <Input type={showPassword ? "text" : "password"} {...field} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </AuthForm>
  );
}
