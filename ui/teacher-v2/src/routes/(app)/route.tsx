import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import AppContainer from "../../components/container/AppContainer";
import Header from "../../components/header/Header";
import MainSidebar from "../../components/sidebar/MainSidebar";

export const Route = createFileRoute("/(app)")({
    component: RouteComponent,
    async beforeLoad({ context }) {
        const { updateUserInfo, user } = context.auth;

        if (!user) {
            try {
                await updateUserInfo();
            } catch (error: any) {
                throw redirect({
                    to: "/auth/login",
                });
            }
        }
    },
});

function RouteComponent() {
    return (
        <div>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
            <Header></Header>
            <AppContainer className="flex justify-start items-start gap-5 h-[calc(100svh-75px)]">
                <MainSidebar></MainSidebar>
                <div className="flex-1 w-full h-full p-3">
                    <Outlet></Outlet>
                </div>
            </AppContainer>
        </div>
    );
}
