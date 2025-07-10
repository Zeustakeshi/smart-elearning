import { useState } from "react";
import { GiDiamonds } from "react-icons/gi";
import { MdModeEdit } from "react-icons/md";
import Button from "../../../../../components/ui/Button";
import TextArea from "../../../../../components/ui/Textarea";
import Title from "../../../../../components/ui/Title";

type Props = {
    value: string;
};

const CourseDecription = ({ value }: Props) => {
    const [name, setName] = useState<string>(value);
    const [editValue, setEditValue] = useState<string>(name);
    const [isEdit, setEdit] = useState<boolean>(false);

    const handleSaveCourseDescription = async () => {
        if (!editValue.trim()) return;
        setName(editValue.trim());
        setEdit(false);
    };

    return (
        <div className="mt-5">
            <div className="mb-6 flex justify-start items-center gap-5">
                <Title showUnderline>Giới thiệu khóa học</Title>
                {!isEdit && (
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
                )}
            </div>
            {!isEdit && <div>{name}</div>}
            {isEdit && (
                <div className="relative">
                    <Button className="!p-1 absolute right-2 top-2">
                        <GiDiamonds></GiDiamonds>
                    </Button>
                    <div className="border border-foreground rounded-xl focus-within:border-primary transition-all">
                        <TextArea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="!shadow-none p-5 max-h-[200px]"
                            placeholder="Giới thiệu về khóa học của bạn"
                        ></TextArea>
                    </div>
                    <div className="mt-2 flex gap-2 w-full justify-end items-center">
                        <Button
                            onClick={() => {
                                setEdit(false);
                            }}
                            variant="outline"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSaveCourseDescription}
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

export default CourseDecription;
