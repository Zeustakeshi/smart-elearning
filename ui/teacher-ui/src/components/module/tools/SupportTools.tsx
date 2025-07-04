import CardList from "./CardList";
import TagList from "./TagList";

const SupportTools = () => {
  return (
    <div>
      {/* Tiêu đề con và phụ */}
      <div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
          Công cụ hỗ trợ
        </h2>
        <p className="mt-2 text-gray-600 border-b pb-2">
          Sử dụng các công cụ như Heroicons, Tailwind CSS và React để xây dựng
          giao diện người dùng đẹp mắt, trực quan và hiệu quả.
        </p>
      </div>
      {/* Danh sách thẻ: My favorite, All Tools,... */}
      <TagList />

      {/* Danh Sách card công cụ: ... */}
      <CardList />
    </div>
  );
};
export default SupportTools;
