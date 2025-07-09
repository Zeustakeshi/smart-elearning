import FileUploadedItem from "./FileUploadedItem";

type Props = {};

const FileUploadedArea = ({}: Props) => {
    return (
        <div className="w-[80%] mx-auto my-2 flex gap-2">
            {new Array(3).fill(0).map((_, index) => (
                <FileUploadedItem key={index}></FileUploadedItem>
            ))}
        </div>
    );
};

export default FileUploadedArea;
