import { IoSearch } from "react-icons/io5";

type Props = {};

const ToolSearch = ({}: Props) => {
    return (
        <div className="group flex items-center min-w-[300px] border-foreground focus-within:border-primary border  rounded-full  ">
            <div className="p-2 flex justify-center items-center">
                <IoSearch size={22} className="text-slate-700" />
            </div>
            <input
                type="text"
                className="w-full !outline-none !border-none pr-3 py-2"
                placeholder="Tìm kiếm công cụ"
            />
        </div>
    );
};

export default ToolSearch;
