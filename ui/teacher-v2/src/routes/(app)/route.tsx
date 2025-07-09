import { createFileRoute, Outlet } from "@tanstack/react-router";
import AppContainer from "../../components/container/AppContainer";
import Header from "../../components/header/Header";
import MainSidebar from "../../components/sidebar/MainSidebar";

export const Route = createFileRoute("/(app)")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
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
