export type ModalType = "selection" | "video" | "quiz" | "document" | null;

export interface Answer {
  id: number;
  text: string;
}

export interface SelectionModalProps {
  onSelect: (type: ModalType) => void;
}

export interface VideoModalProps {
  onClose: () => void;
}

export interface QuizModalProps {
  onClose: () => void;
}

export interface DocumentModalProps {
  onClose: () => void;
}
