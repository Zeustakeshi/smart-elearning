import { Home } from "@/components/module/landing/Home";
import { Menu } from "@/components/module/landing/Menu";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="w-full flex justify-end items-center">
        <Menu />
      </div>
      <div>
        <Home />
      </div>
    </div>
  );
}
