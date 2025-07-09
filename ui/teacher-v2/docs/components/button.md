# Tài liệu Component Button

Component `Button` là một component đa dụng và có thể tái sử dụng, cho phép bạn tạo các nút bấm với nhiều kiểu dáng khác nhau. Điểm đặc biệt của component này là khả năng hoạt động như một nút bấm HTML tiêu chuẩn hoặc như một liên kết điều hướng tích hợp với `@tanstack/react-router`.

## ✨ Đặc điểm nổi bật

- 🎨 **Nhiều biến thể (Variants)**: Cung cấp các kiểu dáng được định sẵn bao gồm `primary`, `secondary`, và `outline` để phù hợp với nhiều ngữ cảnh UI khác nhau.
- 🚀 **Tích hợp điều hướng**: Dễ dàng biến nút bấm thành một liên kết điều hướng bằng cách truyền vào prop `to`.
- 👆 **Hành vi tiêu chuẩn**: Hỗ trợ đầy đủ các thuộc tính của một thẻ `<button>` trong HTML, chẳng hạn như `onClick`, `type`, và `disabled`.
- ♿ **Trạng thái Vô hiệu hóa**: Tự động áp dụng các lớp CSS phù hợp khi nút ở trạng thái `disabled`, làm mờ nút và vô hiệu hóa con trỏ.

---

## ⚙️ Hướng dẫn sử dụng & API

### Các thuộc tính (Props)

| Thuộc tính  | Kiểu                   | Mặc định      | Mô tả                                                                                                 |
|-------------|------------------------|---------------|-------------------------------------------------------------------------------------------------------|
| `variant`   | `'primary'` \| `'secondary'` \| `'outline'` | `'primary'` | Xác định kiểu dáng của nút.                                                                          |
| `to`        | `string`               | `undefined`   | Nếu được cung cấp, nút sẽ hoạt động như một liên kết và điều hướng đến đường dẫn này khi được nhấp.   |
| `children`  | `ReactNode`            | `undefined`   | Nội dung được hiển thị bên trong nút (văn bản, icon,...).                                             |
| `className` | `string`               | `undefined`   | Các lớp CSS bổ sung để tùy chỉnh giao diện.                                                           |
| `disabled`  | `boolean`              | `undefined`   | Vô hiệu hóa nút, ngăn chặn tương tác và áp dụng kiểu dáng bị vô hiệu hóa.                             |
| `...props`  | `ButtonHTMLAttributes` |               | Bất kỳ thuộc tính hợp lệ nào khác của thẻ `<button>` trong HTML, ví dụ `onClick`, `type="submit"`,... |

---

## 🚀 Ví dụ sử dụng

### 1\. Các biến thể cơ bản

Bạn có thể sử dụng prop `variant` để thay đổi kiểu dáng của nút. Nếu không được chỉ định, `variant` mặc định là `primary`.

```jsx
import Button from "./Button";

function ButtonExamples() {
    const handleClick = () => {
        alert("Button clicked!");
    };

    return (
        <div className="flex items-center gap-4">
            <Button variant="primary" onClick={handleClick}>
                Primary Button
            </Button>

            <Button variant="secondary">Secondary Button</Button>

            <Button variant="outline">Outline Button</Button>
        </div>
    );
}
```

### 2\. Nút dưới dạng liên kết điều hướng

Bằng cách truyền vào prop `to`, nút sẽ sử dụng `useRouter` từ `@tanstack/react-router` để điều hướng người dùng đến một trang khác. Sự kiện `onClick` sẽ không được gọi trong trường hợp này.

```jsx
import Button from "./Button";

function NavigationExample() {
    return (
        // Khi nhấp vào, sẽ điều hướng đến trang '/settings'
        <Button to="/settings" variant="primary">
            Go to Settings
        </Button>
    );
}
```

### 3\. Nút bị vô hiệu hóa (Disabled)

Chỉ cần thêm prop `disabled` để vô hiệu hóa nút. Component sẽ tự động áp dụng các style phù hợp.

```jsx
import Button from "./Button";

function DisabledExample() {
    return (
        <div className="flex items-center gap-4">
            <Button disabled variant="primary">
                Disabled Primary
            </Button>
            <Button disabled variant="secondary">
                Disabled Secondary
            </Button>
        </div>
    );
}
```
