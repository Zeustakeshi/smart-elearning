import { Register } from "@/components/module/auth/Register";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center m-10">
      <Register className="w-96 h-full" />
    </div>
  );
}
