import ToolCard from "../../../../components/tools/ToolCard";
import {
    toolData,
    type ToolDataItemType,
} from "../../../../components/tools/tools.data";
import Title from "../../../../components/ui/Title";

type Props = {
    title: string;
    filterFunc: (data: ToolDataItemType[]) => ToolDataItemType[];
};

const ToolList = ({ filterFunc, title }: Props) => {
    return (
        <div>
            <Title showUnderline>{title}</Title>
            <div className="flex flex-wrap gap-6 my-8">
                {filterFunc(toolData).map((tool, index) => (
                    <ToolCard key={index} {...tool}></ToolCard>
                ))}
            </div>
        </div>
    );
};

export default ToolList;
