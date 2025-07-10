import { login as loginApi } from "@/api/auth.api";
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
    type LoginValueType,
} from "../../schemas/auth.schema";

export const Route = createFileRoute("/auth/login")({
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
        mutationKey: ["login"],
        mutationFn: (data: LoginValueType) => loginApi(data),
    });

    const onSubmit = async (value: LoginValueType) => {
        try {
            const data = await mutateAsync(value);
            await login(data.accessToken, data.refreshToken);
            toast.success("Đăng nhập thành công");
            router.navigate({ to: "/" });
        } catch (error: any) {
            handleApiError(error);
        }
    };

    return (
        <div className="w-full h-full p-20">
            <h1 className="text-3xl font-semibold text-center">Đăng nhập</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    action=""
                    className="w-full space-y-4"
                >
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

                    <Button
                        disabled={isPending}
                        type="submit"
                        className="w-full mt-2"
                    >
                        {isPending ? "Đang đăng nhập" : "Đăng nhập"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
