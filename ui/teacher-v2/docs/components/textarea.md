# Tài liệu Component TextArea

Component `TextArea` là một thẻ `<textarea>` được cải tiến với một tính năng nổi bật: **khả năng tự động điều chỉnh chiều cao** để vừa vặn với nội dung bên trong. Khi người dùng nhập liệu, vùng văn bản sẽ tự động mở rộng theo chiều dọc, loại bỏ thanh cuộn và mang lại trải nghiệm người dùng tốt hơn.

## ✨ Đặc điểm nổi bật

- 📏 **Tự động điều chỉnh chiều cao**: Component tự động tính toán và đặt chiều cao phù hợp với `scrollHeight` của nội dung, giúp nó "lớn lên" hoặc "thu nhỏ" lại một cách mượt mà.
- 🎨 **Giao diện gọn gàng**: Đi kèm với các style mặc định hiện đại, loại bỏ đường viền `outline` khi focus và vô hiệu hóa tính năng thay đổi kích thước thủ công (`resize-none`).
- 🔗 **Hỗ trợ `forwardRef`**: Cho phép component cha có thể truy cập trực tiếp vào phần tử `<textarea>` gốc thông qua `ref`, hữu ích cho các tác vụ như tự động focus.

---

## ⚙️ Hướng dẫn sử dụng & API

### Các thuộc tính (Props)

| Thuộc tính  | Kiểu                                            | Mô tả                                                                                                                 |
| :---------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `className` | `string`                                        | Các lớp CSS bổ sung để tùy chỉnh giao diện.                                                                           |
| `onChange`  | `(e: ChangeEvent<HTMLTextAreaElement>) => void` | Hàm xử lý được gọi khi nội dung của textarea thay đổi.                                                                |
| `...props`  | `React.ComponentProps<"textarea">`              | Bất kỳ thuộc tính hợp lệ nào khác của thẻ `<textarea>` trong HTML, ví dụ: `placeholder`, `value`, `disabled`, `rows`. |

### ⚠️ Lưu ý quan trọng

Các props `label`, `labelProps`, và `error` được định nghĩa trong kiểu dữ liệu (type) nhưng **hiện tại chưa được sử dụng** trong logic render của component. `TextArea` này không tự động hiển thị nhãn (`<label>`) hay áp dụng các kiểu dáng cho trạng thái lỗi. Bạn cần phải tự triển khai các thành phần giao diện này bên ngoài component nếu cần.

---

## 🚀 Ví dụ sử dụng

Dưới đây là một ví dụ về cách tạo một hộp bình luận đơn giản sử dụng `TextArea`. Vùng nhập liệu sẽ tự động mở rộng khi bạn gõ nhiều dòng.

```jsx
import { useState } from "react";
import TextArea from "./TextArea";

function CommentBox() {
    const [comment, setComment] = useState("");

    return (
        <div className="w-full max-w-lg p-4 border rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-2">
                Để lại bình luận của bạn
            </h3>
            <div className="border rounded-lg p-1 focus-within:ring-2 focus-within:ring-blue-500">
                <TextArea
                    placeholder="Bạn nghĩ gì về điều này?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="min-h-[60px]" // Đặt chiều cao tối thiểu ban đầu
                />
            </div>
            <div className="mt-2 text-sm text-gray-600 text-right">
                Số ký tự: {comment.length}
            </div>
        </div>
    );
}
```
