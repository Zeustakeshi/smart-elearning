# Tài liệu Component Title

Component `Title` là một component tiêu đề (`<h3>`) có thể tái sử dụng, được thiết kế để hiển thị các tiêu đề một cách nhất quán trong ứng dụng. Nó đi kèm với các kiểu dáng được định sẵn và một hiệu ứng gạch chân động khi người dùng di chuột qua.

## ✨ Đặc điểm nổi bật

- 🎨 **Hai biến thể (Variants)**: Cung cấp 2 kích thước chữ khác nhau là `primary` (lớn, mặc định) và `secondary` (vừa).
- ✨ **Hiệu ứng gạch chân động**: Tích hợp sẵn một gạch chân trang trí bên dưới tiêu đề. Gạch chân này sẽ mượt mà mở rộng chiều rộng khi người dùng di chuột qua tiêu đề, tạo ra một hiệu ứng tương tác tinh tế.
- 🏗️ **Linh hoạt**: Dễ dàng tùy chỉnh thêm bằng cách sử dụng prop `className`.

---

## ⚙️ Hướng dẫn sử dụng & API

### Các thuộc tính (Props)

| Thuộc tính      | Kiểu                                 | Mặc định      | Mô tả                                                                                                                  |
| :-------------- | :----------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `variant`       | `'primary'`                          | `'secondary'` | `'primary'`                                                                                                            | Xác định kiểu dáng (kích thước) của tiêu đề. |
| `children`      | `ReactNode`                          | `undefined`   | Nội dung văn bản hoặc các phần tử React sẽ hiển thị bên trong tiêu đề.                                                 |
| `className`     | `string`                             | `undefined`   | Các lớp CSS bổ sung để tùy chỉnh giao diện.                                                                            |
| `showUnderline` | `boolean`                            | `false`       | **Lưu ý:** Prop này được định nghĩa nhưng hiện tại chưa có ảnh hưởng đến component. Gạch chân động luôn được hiển thị. |
| `...props`      | `HTMLAttributes<HTMLHeadingElement>` |               | Bất kỳ thuộc tính hợp lệ nào khác của thẻ `<h3>` trong HTML.                                                           |

---

## 🚀 Ví dụ sử dụng

### 1\. Tiêu đề mặc định (Primary)

Đây là cách sử dụng cơ bản nhất. Tiêu đề sẽ có kích thước lớn và hiệu ứng gạch chân.

```jsx
import Title from "./Title";

function SectionHeader() {
    return <Title>Sản phẩm nổi bật</Title>;
}
```

### 2\. Tiêu đề phụ (Secondary)

Sử dụng `variant="secondary"` để có một tiêu đề với kích thước nhỏ hơn.

```jsx
import Title from "./Title";

function SubsectionHeader() {
    return <Title variant="secondary">Danh mục liên quan</Title>;
}
```

### 3\. Tùy chỉnh Style

Bạn có thể dễ dàng ghi đè hoặc bổ sung style bằng cách sử dụng `className`.

```jsx
import Title from "./Title";

function CustomTitle() {
    return (
        <Title className="text-teal-500">Tiêu đề với màu sắc tùy chỉnh</Title>
    );
}
```
