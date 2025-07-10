import { createAccount } from "@/api/auth.api";
import { useAuth } from "@/context/AuthContext";
import { handleApiError } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/Form";
import {
    CreateAccountSchema,
    type CreateAccountValueType,
} from "../../schemas/auth.schema";

export const Route = createFileRoute("/auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const form = useForm<CreateAccountValueType>({
        resolver: zodResolver(CreateAccountSchema),
        defaultValues: {
            fullName: "Nguyễn Văn A",
            username: "nguyenvana",
            email: "nguyenvana@gmail.com",
            phone: "0984212341",
            password: "ABCabc123@",
            confirmPassword: "ABCabc123@",
        },
    });

    const { login } = useAuth();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ["create-account"],
        mutationFn: (data: CreateAccountValueType) => createAccount(data),
    });

    const onSubmit = async (value: CreateAccountValueType) => {
        try {
            const data = await mutateAsync(value);
            await login(data.accessToken, data.refreshToken);
            toast.success("Tạo tài khoản thành công");
            router.navigate({ to: "/" });
        } catch (error: any) {
            handleApiError(error);
        }
    };

    return (
        <div className="w-full h-full p-20">
            <h1 className="text-3xl font-semibold text-center">
                Tạo tài khoản
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    action=""
                    className="w-full space-y-4"
                >
                    {/* FULLNAME */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="text-sm font-semibold">
                                    Họ và tên
                                </FormLabel>
                                <FormControl {...field}>
                                    <input
                                        className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                        type="text"
                                        placeholder="Ví dụ: Nguyễn Văn A"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* USERNAME */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="text-sm font-semibold">
                                    Tên đăng nhập
                                </FormLabel>
                                <FormControl {...field}>
                                    <input
                                        className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                        type="text"
                                        placeholder="Ví dụ: nguyenvana"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="text-sm font-semibold">
                                    Địa chỉ email
                                </FormLabel>
                                <FormControl {...field}>
                                    <input
                                        className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                        type="email"
                                        placeholder="Ví dụ: nguyenvana@gmail.com"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PHONE */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel className="text-sm font-semibold">
                                    Số điện thoại
                                </FormLabel>
                                <FormControl {...field}>
                                    <input
                                        className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                        type="tel"
                                        placeholder="Ví dụ: 0987654321"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2">
                        {/* PASSWORD */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel className="text-sm font-semibold">
                                        Mật khẩu
                                    </FormLabel>
                                    <FormControl {...field}>
                                        <input
                                            className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                            type="password"
                                            placeholder="••••••••••••"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* PHONE */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem className="flex flex-col w-full">
                                    <FormLabel className="text-sm font-semibold">
                                        Nhập lại mật khẩu
                                    </FormLabel>
                                    <FormControl {...field}>
                                        <input
                                            className="px-4 py-2 rounded-xl w-full border border-foreground focus:border-primary outline-primary"
                                            type="password"
                                            placeholder="••••••••••••"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full mt-2"
                    >
                        {isPending ? "Đang tạo tài khoản" : "Tạo tài khoản"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
