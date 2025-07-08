import { createFileRoute } from "@tanstack/react-router";
import RegisterForm from "./-components/RegisterForm";

export const Route = createFileRoute("/auth/register")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <RegisterForm></RegisterForm>
        </div>
    );
}
