import { ToolsGlass } from "@/components/module/tools/glass-tool/ToolsGlass";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_dashboard/tools")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {/* <SupportTools></SupportTools> */}
      <h1>Cộng Cụ AI Hỗ Trợ Giáo Viên</h1>
      <ToolsGlass />
    </div>
  );
}
