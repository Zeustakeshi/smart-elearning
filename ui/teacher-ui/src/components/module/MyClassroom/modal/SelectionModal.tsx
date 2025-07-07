import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ModalType, SelectionModalProps } from "@/types/class-room";
import { FileText, HelpCircle, Video } from "lucide-react";
import type { FC } from "react";

export const SelectionModal: FC<SelectionModalProps> = ({ onSelect }) => {
  const options = [
    {
      type: "video",
      label: "Video",
      icon: <Video className="text-red-500" />,
      description: "Tải lên bài giảng video từ YouTube, Vimeo.",
    },
    {
      type: "quiz",
      label: "Trắc nghiệm",
      icon: <HelpCircle className="text-green-500" />,
      description: "Tạo một bài kiểm tra trắc nghiệm cho học sinh.",
    },
    {
      type: "document",
      label: "Tài liệu",
      icon: <FileText className="text-blue-500" />,
      description: "Chia sẻ tài liệu định dạng PDF, DOCX, ...",
    },
  ];

  return (
    <>
      <DialogHeader>
        <DialogTitle>Chọn loại bài học mới</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div className="grid grid-cols-1 gap-4">
          {options.map((opt) => (
            <button
              key={opt.type}
              onClick={() => onSelect(opt.type as ModalType)}
              className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg text-left hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              <div className="bg-slate-100 p-3 rounded-lg">{opt.icon}</div>
              <div>
                <p className="font-bold text-slate-800">{opt.label}</p>
                <p className="text-sm text-slate-500">{opt.description}</p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </>
  );
};
