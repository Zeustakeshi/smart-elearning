# Tài liệu Component Dropdown

Bộ component `Dropdown` được xây dựng để tạo ra các menu thả xuống (dropdown/select) một cách linh hoạt, dễ dàng và có khả năng truy cập cao (accessible). Component này được phát triển dựa trên thư viện **Headless UI**, giúp bạn tận dụng được các tính năng mạnh mẽ như quản lý trạng thái mở/đóng, điều hướng bằng bàn phím, và tuân thủ các chuẩn WAI-ARIA mà không cần phải viết logic phức tạp.

## ✨ Khái niệm cốt lõi

1.  **Mô hình Composition**: `Dropdown` không phải là một component đơn lẻ, mà là một tập hợp các component con (`DropdownTrigger`, `DropdownContent`, `DropdownItem`) làm việc cùng nhau. Bạn cần kết hợp chúng để tạo ra một dropdown hoàn chỉnh.
2.  **Quản lý trạng thái bằng Context**: Trạng thái của dropdown (giá trị được chọn, nhãn hiển thị) được quản lý thông qua React Context (`DropdownContext`). Điều này cho phép `DropdownItem` khi được chọn có thể tự động cập nhật nhãn hiển thị trên `DropdownTrigger`.
3.  **Tích hợp Headless UI**: Bằng cách sử dụng `@headlessui/react`, component được thừa hưởng các tính năng quan trọng:
    - **Accessibility**: Tự động xử lý các thuộc tính ARIA.
    - **Keyboard Navigation**: Người dùng có thể sử dụng các phím mũi tên, `Enter`, `Esc` để tương tác.
    - **Transitions**: Hiệu ứng xuất hiện/biến mất mượt mà được tích hợp sẵn.

---

## 🏗️ Hướng dẫn sử dụng & API

Dưới đây là chi tiết về từng component được export.

### `Dropdown`

Đây là component gốc, bao bọc toàn bộ dropdown và cung cấp context cho các component con.

- **Props quan trọng**:
    - `children`: **Bắt buộc**. Phải chứa các component `DropdownTrigger` và `DropdownContent`.
    - `onChange`: `(value: any) => void`. **Bắt buộc**. Hàm callback sẽ được gọi mỗi khi một `DropdownItem` được chọn. Nó nhận vào `value` của item đó.
    - `value`: `any`. Giá trị hiện tại của dropdown, được quản lý từ component cha.
    - `className`: `string`. Tùy chỉnh class cho container của dropdown.

### `DropdownTrigger`

Là nút bấm mà người dùng nhấp vào để mở hoặc đóng menu dropdown.

- **Chức năng**: Nó tự động hiển thị `label` của `DropdownItem` được chọn sau cùng. Nếu chưa có giá trị nào được chọn, nó sẽ hiển thị một placeholder mặc định là "Chọn 1 giá trị".

### `DropdownContent`

Là container chứa danh sách các `DropdownItem`.

- **Chức năng**: Nó sử dụng `Transition` của Headless UI để tạo hiệu ứng animation khi xuất hiện và biến mất. Bạn chỉ cần đặt các `DropdownItem` vào bên trong nó.

### `DropdownItem`

Đại diện cho một lựa chọn trong danh sách dropdown.

- **Props quan trọng**:
    - `value`: **Bắt buộc**. Giá trị thực sự của lựa chọn này. Đây là giá trị sẽ được truyền vào hàm `onChange` của `Dropdown`.
    - `label`: **Bắt buộc**. Chuỗi văn bản sẽ được hiển thị cho người dùng trong danh sách và trên `DropdownTrigger` khi được chọn.
    - `activeClassName`: `string`. Class CSS sẽ được áp dụng khi item đang được focus (bằng chuột hoặc bàn phím).

---

## 🚀 Ví dụ sử dụng

Dưới đây là một ví dụ hoàn chỉnh về cách tạo một dropdown để chọn một thành phố.

```jsx
import { useState } from "react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from "./Dropdown";

const CITIES = [
    { id: "hcm", name: "Hồ Chí Minh" },
    { id: "hn", name: "Hà Nội" },
    { id: "dn", name: "Đà Nẵng" },
];

function CitySelector() {
    // 1. Dùng useState để quản lý giá trị được chọn
    const [selectedCityId, setSelectedCityId] = useState(null);

    return (
        <div>
            <Dropdown value={selectedCityId} onChange={setSelectedCityId}>
                {/* Nút bấm để mở dropdown */}
                <DropdownTrigger />

                {/* Nội dung của dropdown */}
                <DropdownContent>
                    {CITIES.map((city) => (
                        <DropdownItem
                            key={city.id}
                            value={city.id} // Giá trị thật sự để quản lý state
                            label={city.name} // Nhãn để hiển thị cho người dùng
                            activeClassName="bg-blue-500 text-white" // Tùy chỉnh style khi hover
                        />
                    ))}
                </DropdownContent>
            </Dropdown>

            {/* Hiển thị giá trị đã chọn để kiểm tra */}
            <p className="mt-4">
                ID Thành phố đã chọn: {selectedCityId || "Chưa chọn"}
            </p>
        </div>
    );
}
```

Trong ví dụ này:

1.  Chúng ta dùng `useState` (`selectedCityId`) trong component cha (`CitySelector`) để lưu trữ giá trị của dropdown.
2.  State này được truyền vào props `value` và `onChange` của component `Dropdown`.
3.  Khi một `DropdownItem` được nhấp, nó sẽ gọi hàm `onChange` (chính là `setSelectedCityId`) với `value` tương ứng (`city.id`), đồng thời cập nhật `label` trên `DropdownTrigger` thành `label` của item đó (`city.name`).
4.  Quá trình này tạo ra một luồng dữ liệu một chiều (one-way data flow) rõ ràng và dễ quản lý.
