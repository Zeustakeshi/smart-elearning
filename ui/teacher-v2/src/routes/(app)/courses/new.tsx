import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import Button from "../../../components/ui/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../../../components/ui/Dropdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/Form";
import Title from "../../../components/ui/Title";
import {
  CreateCourseSchema,
  type CreateCourseSchemaType,
} from "../../../schemas/createCourse.schema";
import { useMutation } from "@tanstack/react-query";
import { createCourse } from "@/api/course.api";
import toast from "react-hot-toast";
import { handleApiError } from "@/lib/utils";

export const Route = createFileRoute("/(app)/courses/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<CreateCourseSchemaType>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      permission: "PRIVATE",
    },
  });

  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-account"],
    mutationFn: (data: CreateCourseSchemaType) => createCourse(data),
  });

  const handleSubmit = async (value: CreateCourseSchemaType) => {
    try {
      await mutateAsync(value);
      toast.success("Một khóa học vừa được thành công");
      router.navigate({ to: "/" });
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="w-full">
      <Title>Khóa học mới</Title>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="my-8 space-y-6 w-full"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem {...field} className="flex flex-col">
                <FormLabel>Tên khóa học</FormLabel>
                <FormControl {...field}>
                  <input
                    className="px-5 py-3 border border-slate-200 outline-primary rounded-xl "
                    type="text"
                    placeholder="Toán, Vật lý, Lịch sử, ..."
                  />
                </FormControl>
                <FormMessage className="text-sm "></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem {...field} className="flex flex-col">
                <FormLabel>Mô tả</FormLabel>
                <FormControl {...field}>
                  <textarea
                    className="px-5 py-3 border border-slate-200 outline-primary rounded-xl min-h-[150px]"
                    placeholder="Mô tả lớp học"
                  />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="permission"
            control={form.control}
            render={({ field }) => (
              <FormItem {...field} className="flex gap-2 items-center ">
                <FormLabel>Phạm vi truy cập: </FormLabel>
                <Dropdown
                  value={form.getValues("permission")}
                  onChange={(value) => {
                    form.setValue("permission", value);
                  }}
                >
                  <DropdownTrigger />
                  <DropdownContent>
                    <DropdownItem value="PUBLIC" label="Công khai" />
                    <DropdownItem value="PRIVATE" label="Riêng tư" />
                    <DropdownItem
                      value="LINK_ONLY"
                      label="Chỉ những người được chia sẻ"
                    />
                  </DropdownContent>
                </Dropdown>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <div className="mt-5 flex justify-end items-center w-full gap-3">
            <Button
              onClick={() => router.navigate({ to: "/courses" })}
              type="button"
              variant="secondary"
            >
              Trở về
            </Button>
            <Button disabled={isPending}>
              {isPending ? "Đang tạo khóa học" : "Tạo khóa học"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
