import { TfiMoreAlt } from "react-icons/tfi";
import { toolData } from "../../../../components/tools/tools.data";
import Title from "../../../../components/ui/Title";
import ToolItem from "./ToolItem";
type Props = {};

const RecentTools = ({}: Props) => {
    return (
        <div className="my-5">
            <Title>Công cụ hỗ trợ </Title>
            <div className="mt-5 flex flex-wrap justify-center items-start gap-10">
                {toolData.slice(0, 5).map((tool, index) => (
                    <ToolItem key={index} {...tool}></ToolItem>
                ))}
                <ToolItem
                    bgColor="oklch(92.9% 0.013 255.508)"
                    icon={<TfiMoreAlt />}
                    title="Xem tất cả"
                    to="/tools"
                    iconClassName="!text-slate-700"
                ></ToolItem>
            </div>
        </div>
    );
};

export default RecentTools;
