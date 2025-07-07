import type { DocumentModalProps } from "@/types/class-room";
import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";

export const DocumentModal: FC<DocumentModalProps> = ({ onClose }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting document form...");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Thêm tài liệu mới</DialogTitle>
      </DialogHeader>
      <DialogContent className="space-y-4">
        <div>
          <Label htmlFor="doc-name">Tên tài liệu</Label>
          <Input id="doc-name" placeholder="Ví dụ: Đề cương ôn tập học kỳ 1" />
        </div>
        <div>
          <Label htmlFor="doc-upload">Tải file lên</Label>
          <label
            htmlFor="doc-upload"
            className="relative flex w-full cursor-pointer flex-col items-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center hover:border-slate-400 hover:bg-slate-100"
          >
            <UploadCloud className="mb-2 h-10 w-10 text-slate-400" />
            <span className="font-semibold text-slate-600">
              {fileName ?? "Nhấn để tải lên hoặc kéo thả"}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              PDF, DOCX, PPT, PNG, JPG (tối đa 10MB)
            </span>
          </label>
          <input
            id="doc-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <Label htmlFor="doc-description">Mô tả</Label>
          <Textarea
            id="doc-description"
            placeholder="Mô tả ngắn về tài liệu..."
          />
        </div>
      </DialogContent>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Lưu tài liệu</Button>
      </DialogFooter>
    </form>
  );
};
