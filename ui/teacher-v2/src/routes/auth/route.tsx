import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
export const Route = createFileRoute("/auth")({
  component: RouteComponent,
  beforeLoad({ context }) {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-gradient-to-br from-sky-300 via-blue-200 to-indigo-300">
      <div className=" w-2xl flex justify-center items-center shadow-lg bg-white  rounded-3xl">
        <Outlet></Outlet>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
    </div>
  );
}
