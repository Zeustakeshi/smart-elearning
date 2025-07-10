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
        <div className="grid grid-cols-10 w-screen h-screen">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-stone-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
            <div className="col-span-5 h-full bg-blue-500"></div>
            <div className="col-span-5 h-full flex justify-center items-center">
                <Outlet></Outlet>
                <Toaster position="top-right" reverseOrder={true} />
            </div>
        </div>
    );
}
