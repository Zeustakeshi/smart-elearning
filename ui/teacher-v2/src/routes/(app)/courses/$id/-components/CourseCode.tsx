import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuCopy } from "react-icons/lu";
import Button from "../../../../../components/ui/Button";
type Props = {
    value: string;
};

const CourseCode = ({ value }: Props) => {
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => {
            setCopied(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <div className="flex justify-start items-center gap-2">
            <p className="text-xl font-semibold text-white">Mã lớp: {value}</p>

            <CopyToClipboard text={value} onCopy={() => setCopied(true)}>
                <Button
                    className="!p-1 !px-2 rounded-full text-[12px] font-semibold"
                    variant="secondary"
                >
                    {copied ? <IoCheckmarkDoneOutline /> : <LuCopy></LuCopy>}
                </Button>
            </CopyToClipboard>
        </div>
    );
};

export default CourseCode;
