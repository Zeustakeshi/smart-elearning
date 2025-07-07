import type { Answer, QuizModalProps } from "@/types/class-room";
import { useState, type FC } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";

export const QuizModal: FC<QuizModalProps> = ({ onClose }) => {
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);
  const [correctAnswerId, setCorrectAnswerId] = useState<number>(1);

  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), text: "" }]);
  };

  const handleRemoveAnswer = (id: number) => {
    if (answers.length <= 2) return; // Must have at least 2 answers
    setAnswers(answers.filter((a) => a.id !== id));
    // If the removed answer was the correct one, set the first one as correct
    if (correctAnswerId === id) {
      setCorrectAnswerId(answers[0]?.id ?? 0);
    }
  };

  const handleAnswerTextChange = (id: number, text: string) => {
    setAnswers(answers.map((a) => (a.id === id ? { ...a, text } : a)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save the quiz
    console.log("Submitting quiz form...");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Thêm bài trắc nghiệm</DialogTitle>
      </DialogHeader>
      <DialogContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-3">
        <div>
          <Label htmlFor="quiz-question">Câu hỏi</Label>
          <Textarea
            id="quiz-question"
            placeholder="Ví dụ: Thủ đô của Việt Nam là gì?"
          />
        </div>
        <div>
          <Label htmlFor="quiz-answers">Các đáp án</Label>
          <div className="space-y-3">
            {answers.map((answer, index) => (
              <div key={answer.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct-answer"
                  id={`answer-radio-${answer.id}`}
                  checked={correctAnswerId === answer.id}
                  onChange={() => setCorrectAnswerId(answer.id)}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <Input
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerTextChange(answer.id, e.target.value)
                  }
                  placeholder={`Đáp án ${index + 1}`}
                  className="flex-grow"
                />
                <Button
                  className="bg-red-600 "
                  type="button"
                  size="icon"
                  onClick={() => handleRemoveAnswer(answer.id)}
                  disabled={answers.length <= 2}
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddAnswer}
            className="mt-4"
          >
            <Plus size={16} className="mr-2" /> Thêm đáp án
          </Button>
        </div>
      </DialogContent>
      <DialogFooter>
        <Button type="button" variant="secondary" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Lưu trắc nghiệm</Button>
      </DialogFooter>
    </form>
  );
};
