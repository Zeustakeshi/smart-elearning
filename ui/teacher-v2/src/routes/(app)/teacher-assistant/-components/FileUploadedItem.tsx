import { FaRegFileAlt } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
type Props = {};

const FileUploadedItem = ({}: Props) => {
    return (
        <div className="relative flex justify-start items-center gap-2 px-2 py-1 border rounded-lg border-foreground">
            <div className="  size-[20px] absolute top-[-8px] right-[-8px] bg-slate-100 flex justify-center items-center rounded-full cursor-pointer">
                <IoCloseSharp />
            </div>
            <span>
                <FaRegFileAlt></FaRegFileAlt>
            </span>
            <span>FileUploadedItem</span>
        </div>
    );
};

export default FileUploadedItem;
