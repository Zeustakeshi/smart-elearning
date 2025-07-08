import { Textarea } from "@/components/ui/textarea";
import { PencilIcon, SparklesIcon } from "@heroicons/react/24/outline";

export const ClassIntroduction = () => (
  <div className="mt-8">
    <h2 className="mb-2 text-xl font-bold">
      Giới thiệu lớp học
      <PencilIcon className="inline h-5 w-5 cursor-pointer" />
    </h2>
    <div className="relative">
      <Textarea placeholder="Text editor" className="h-28" />
      <button className="absolute bottom-4 right-4 rounded-full border-2 bg-white p-2">
        <SparklesIcon className="h-4 w-4" />
      </button>
    </div>
  </div>
);
