# Tài liệu Component Form

Bộ component `Form` này được thiết kế để giúp việc xây dựng form trong React trở nên dễ dàng, có cấu trúc và dễ dàng tái sử dụng. Nó được xây dựng dựa trên thư viện `react-hook-form` mạnh mẽ, cung cấp một lớp trừu tượng để đơn giản hóa việc quản lý trạng thái, validation và accessibility.

## ✨ Các khái niệm cốt lõi

Trước khi đi vào chi tiết từng component, hãy cùng tìm hiểu các nguyên tắc hoạt động chính:

1.  **Dựa trên `react-hook-form`**: Tận dụng toàn bộ sức mạnh của `react-hook-form` để quản lý trạng thái, validation và submission.
2.  **Cấu trúc dựa trên Context**: Các component giao tiếp với nhau một cách "ngầm" thông qua React Context.
    - `FormFieldContext`: Chia sẻ `name` (tên) của trường dữ liệu cho các component con.
    - `FormItemContext`: Cung cấp một `id` duy nhất cho mỗi nhóm `FormItem` để liên kết `label` và `input` cho accessibility.
3.  **Tự động liên kết**: Các component như `FormLabel` và `FormMessage` tự động lấy thông tin cần thiết (như `id` của input, trạng thái lỗi) từ context, giúp bạn không cần phải truyền props một cách thủ công.
4.  **Tùy biến linh hoạt**: Bạn có thể dễ dàng tùy chỉnh giao diện và hành vi bằng cách sử dụng các props tiêu chuẩn và tiện ích `cn` để kết hợp các class CSS.

---

## 🏗️ Hướng dẫn sử dụng & API

Dưới đây là chi tiết về từng component được export.

### `Form`

Đây là component gốc bao bọc toàn bộ form của bạn. Về bản chất, nó chính là `FormProvider` của `react-hook-form`.

- **Mục đích**: Cung cấp context từ `react-hook-form` để tất cả các component con có thể truy cập vào trạng thái (`formState`), các phương thức (`register`, `control`, `handleSubmit`,...) của form.
- **Cách dùng**: Bạn cần truyền tất cả các phương thức và thuộc tính trả về từ hook `useForm` của `react-hook-form` vào component này.

<!-- end list -->

```jsx
import { useForm } from "react-hook-form";
import { Form } from "./Form";

function MyForm() {
    const form = useForm();

    return <Form {...form}>{/* ... các trường dữ liệu của bạn ... */}</Form>;
}
```

### `FormField`

Component này kết nối một trường dữ liệu cụ thể với `react-hook-form`. Nó là một lớp bao bọc (wrapper) cho component `Controller` của `react-hook-form`.

- **Mục đích**: Đăng ký một input vào form, quản lý trạng thái (value, error, touched,...) của nó và cung cấp `name` của field cho các component con.
- **Props quan trọng**:
    - `control`: Đối tượng `control` được lấy từ `useForm()`.
    - `name`: Tên định danh cho trường dữ liệu (ví dụ: `"username"`).
    - `render`: Một hàm nhận vào `{ field, fieldState, formState }` và trả về JSX của input component. `field` chứa các props cần thiết (`onChange`, `onBlur`, `value`, `ref`) để kết nối với input.

### `FormItem`

Là một `div` bao bọc, dùng để nhóm các thành phần liên quan đến một trường dữ liệu (label, input, message).

- **Mục đích**:
    1.  Tạo ra một `id` duy nhất và cung cấp nó thông qua `FormItemContext`.
    2.  Tạo khoảng cách mặc định giữa các phần tử bên trong (`space-y-2`).
- **Cách dùng**: Bao bọc `FormLabel`, `FormControl`, và `FormMessage` lại với nhau.

<!-- end list -->

```jsx
import { FormItem, FormLabel, FormControl, FormMessage } from "./Form";

<FormItem>
    <FormLabel>Username</FormLabel>
    <FormControl>
        <Input placeholder="Nhập tên người dùng" />
    </FormControl>
    <FormMessage />
</FormItem>;
```

### `FormLabel`

Component hiển thị nhãn (`<label>`) cho một trường dữ liệu.

- **Mục đích**: Tự động liên kết với input tương ứng thông qua thuộc tính `htmlFor`. Nó cũng tự động đổi màu khi có lỗi.
- **Cách hoạt động**: Nó sử dụng hook `useFormField` để lấy `formItemId` (ID của input) và trạng thái `error`.

### `FormControl`

Component này dùng để bao bọc input component thực tế của bạn (ví dụ: `<input>`, `<select>`, hoặc một component `Input` tùy chỉnh).

- **Mục đích**: "Tiêm" các props cần thiết vào component con duy nhất của nó.
- **Cách hoạt động**: Nó sử dụng `cloneElement` để truyền `id`, `ref`, và các class CSS báo lỗi vào component input mà bạn cung cấp, giúp input được kết nối với form và có giao diện phù hợp khi có lỗi.

### `FormMessage`

Hiển thị thông báo lỗi validation cho một trường.

- **Mục đích**: Tự động hiển thị thông báo lỗi từ `react-hook-form`. Nếu không có lỗi, nó sẽ không được render.
- **Cách hoạt động**: Nó sử dụng hook `useFormField` để lấy đối tượng `error`. Nếu `error.message` tồn tại, nó sẽ hiển thị thông báo đó.

---

## 🚀 Ví dụ hoàn chỉnh

Dưới đây là một ví dụ hoàn chỉnh về cách xây dựng một form đăng nhập đơn giản bằng cách kết hợp tất cả các component trên.

Giả sử bạn có một component `Input` cơ bản:

```jsx
// components/ui/Input.jsx
import * as React from "react";
import { cn } from "../../lib/utils"; // Giả sử bạn có tiện ích này

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

export { Input };
```

Bây giờ, hãy tạo form đăng nhập:

```jsx
// components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "./ui/Button"; // Component Button giả định
import { Input } from "./ui/Input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./Form";

// 1. Định nghĩa schema validation bằng Zod
const formSchema = z.object({
    username: z.string().min(2, {
        message: "Tên người dùng phải có ít nhất 2 ký tự.",
    }),
    password: z.string().min(6, {
        message: "Mật khẩu phải có ít nhất 6 ký tự.",
    }),
});

export function LoginForm() {
    // 2. Thiết lập form với useForm
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    // 3. Định nghĩa hàm xử lý khi submit
    function onSubmit(values) {
        console.log("Dữ liệu form:", values);
        alert("Form đã được gửi thành công!");
    }

    // 4. Xây dựng giao diện form
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
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
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Đăng nhập</Button>
            </form>
        </Form>
    );
}
```

Trong ví dụ này:

1.  Chúng ta định nghĩa cấu trúc và luật validation bằng `zod`.
2.  `useForm` được cấu hình với `zodResolver` để tích hợp validation.
3.  Component `Form` bao bọc toàn bộ và nhận các props từ `form`.
4.  Mỗi trường dữ liệu (`username`, `password`) được bọc trong `FormField` để kết nối với state.
5.  Bên trong `FormField`, chúng ta sử dụng `FormItem`, `FormLabel`, `FormControl`, và `FormMessage` để tạo cấu trúc HTML rõ ràng và dễ quản lý.
6.  `FormControl` bao bọc component `Input` và tự động truyền các props `onChange`, `onBlur`, `value`,... từ `render` của `FormField` nhờ `...field`.
