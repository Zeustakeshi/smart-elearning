import { Register } from "@/components/module/auth/Register";
import { isAuthenticated } from "@/services/authServices";
import { createFileRoute, redirect } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/auth/register")({
  beforeLoad: async () => {
    if (isAuthenticated()) {
      toast.error("Bạn đã đăng nhập rồi!");
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center m-10">
      <Register className="w-96 h-full" />
    </div>
  );
}
