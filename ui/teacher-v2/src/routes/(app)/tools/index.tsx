import { createFileRoute } from "@tanstack/react-router";
import ToolList from "./-components/ToolList";
import ToolSearch from "./-components/ToolSearch";

export const Route = createFileRoute("/(app)/tools/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="size-full">
            <div className="w-full flex justify-end items-center mb-5">
                <ToolSearch></ToolSearch>
            </div>
            <div>
                <ToolList
                    title="Yêu thích"
                    filterFunc={(data) =>
                        data.filter(
                            (item) => item.title === "Bài kiểm tra nhanh"
                        )
                    }
                ></ToolList>
                <ToolList title="Hỗ trợ" filterFunc={(data) => data}></ToolList>
                <ToolList
                    title="Sáng tạo"
                    filterFunc={(data) => data.slice(0, 2)}
                ></ToolList>
                <ToolList
                    title="Lên kế hoạch"
                    filterFunc={(data) => data}
                ></ToolList>
            </div>
        </div>
    );
}
