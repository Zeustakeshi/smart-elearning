import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <div className="flex gap-6 px-4 py-4 border-b items-center">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/dashboard" className="[&.active]:font-bold">
          Trang giáo viên
        </Link>
        <Link to="/auth/login" className="[&.active]:font-bold">
          Đăng nhập
        </Link>
      </div>
      <h3>Welcome Home!</h3>
    </div>
  );
}
