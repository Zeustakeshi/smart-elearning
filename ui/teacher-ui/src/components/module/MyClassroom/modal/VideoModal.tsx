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
import type { VideoModalProps } from "@/types/class-room";

import type { FC } from "react";

export const VideoModal: FC<VideoModalProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting video form...");
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Thêm bài học video</DialogTitle>
      </DialogHeader>
      <DialogContent className="space-y-4">
        <div>
          <Label htmlFor="video-title">Tiêu đề video</Label>
          <Input
            id="video-title"
            placeholder="Ví dụ: Bài giảng về Lịch sử Việt Nam"
          />
        </div>
        <div>
          <Label htmlFor="video-link">Link video (YouTube, Vimeo)</Label>
          <Input id="video-link" placeholder="https://youtube.com/..." />
        </div>
        <div>
          <Label htmlFor="video-description">Mô tả</Label>
          <Textarea
            id="video-description"
            placeholder="Nội dung chính của video..."
          />
        </div>
      </DialogContent>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Lưu video</Button>
      </DialogFooter>
    </form>
  );
};
