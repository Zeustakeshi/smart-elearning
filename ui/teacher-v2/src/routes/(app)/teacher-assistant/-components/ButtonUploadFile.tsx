import { MdOutlineAttachFile } from "react-icons/md";
import Button from "../../../../components/ui/Button";

type Props = {};

const ButtonUploadFile = ({}: Props) => {
    return (
        <Button className="!p-2 rounded-full" variant="outline">
            <MdOutlineAttachFile></MdOutlineAttachFile>
        </Button>
    );
};

export default ButtonUploadFile;
