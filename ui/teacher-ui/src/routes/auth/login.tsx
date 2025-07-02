import { Login } from "@/components/module/login/Login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center  m-40">
      <Login className="w-96 h-full" />
    </div>
  );
}
