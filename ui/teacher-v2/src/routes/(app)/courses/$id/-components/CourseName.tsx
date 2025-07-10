import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import Button from "../../../../../components/ui/Button";
type Props = { value: string };

const CourseName = ({ value }: Props) => {
    const [name, setName] = useState<string>(value);
    const [editValue, setEditValue] = useState<string>(name);
    const [isEdit, setEdit] = useState<boolean>(false);

    const handleSaveCourseName = async () => {
        if (!editValue.trim()) return;
        setName(editValue.trim());
        setEdit(false);
    };

    return (
        <div className="">
            {!isEdit && (
                <div className="flex justify-start items-center gap-2">
                    <h3 className="text-3xl font-semibold text-white">
                        {name}
                    </h3>
                    <Button
                        onClick={() => {
                            setEdit(true);
                            setEditValue(name);
                        }}
                        variant="secondary"
                        className="!p-1"
                    >
                        <MdModeEdit></MdModeEdit>
                    </Button>
                </div>
            )}
            {isEdit && (
                <div className="text-white flex justify-start items-center gap-2">
                    <input
                        className="px-5 py-3 rounded-xl border border-slate-400"
                        type="text"
                        onChange={(e) => setEditValue(e.target.value)}
                        value={editValue}
                        placeholder="Nhập Tên khóa học"
                    />
                    <div className="flex justify-start gap-2 items-center">
                        <Button
                            onClick={() => setEdit(false)}
                            variant="outline"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSaveCourseName}
                            variant="primary"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseName;
