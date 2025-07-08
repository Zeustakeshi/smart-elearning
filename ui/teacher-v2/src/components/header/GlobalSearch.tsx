import { IoSearch } from "react-icons/io5";
type Props = {};

const GlobalSearch = (props: Props) => {
    return (
        <div className="group flex items-center min-w-[450px] border-foreground focus-within:border-primary border  rounded-full  ">
            <div className="p-3 flex justify-center items-center">
                <IoSearch size={24} className="text-slate-700" />
            </div>
            <input
                type="text"
                className="w-full !outline-none !border-none pr-5 py-3"
                placeholder="Tìm kiếm khóa học, tài liệu, học viên"
            />
        </div>
    );
};

export default GlobalSearch;
