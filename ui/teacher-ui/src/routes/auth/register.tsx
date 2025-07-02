import { Register } from "@/components/module/register/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center  m-40">
      <Register className="w-96 h-full" />
    </div>
  );
}
