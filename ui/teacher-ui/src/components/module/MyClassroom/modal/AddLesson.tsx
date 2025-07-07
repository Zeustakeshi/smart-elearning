import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import type { ModalType } from "@/types/class-room";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SelectionModal } from "./SelectionModal";
import { VideoModal } from "./VideoModal";
import { QuizModal } from "./QuizModal";
import { DocumentModal } from "./DocumentModal";

export const AddLesson = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setActiveModal(null);
    }
  };

  const handleSelect = (type: ModalType) => {
    setActiveModal(type);
  };
  return (
    <div className=" flex items-center justify-center font-sans">
      <div className="text-center">
        <Button
          onClick={() => setActiveModal("selection")}
          className=" text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
        >
          <Plus size={20} />
          Thêm bài học mới
        </Button>
      </div>

      <Dialog open={activeModal !== null} onOpenChange={handleOpenChange}>
        {activeModal === "selection" && (
          <SelectionModal onSelect={handleSelect} />
        )}
        {activeModal === "video" && (
          <VideoModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "quiz" && (
          <QuizModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "document" && (
          <DocumentModal onClose={() => setActiveModal(null)} />
        )}
      </Dialog>
    </div>
  );
};
