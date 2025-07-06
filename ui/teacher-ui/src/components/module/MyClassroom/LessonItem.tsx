import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Lesson } from "@/types/myClass";
import { MoreHorizontal } from "lucide-react";

export const LessonItem = ({ lesson }: { lesson: Lesson }) => (
  <Card className="w-full">
    <CardContent className="flex items-center justify-between p-3">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-lg border-2  bg-gray-100"></div>
        <div>
          <p className="font-bold">{lesson.name}</p>
          <div className="mt-1 flex gap-2">
            {lesson.tags.map((tag) => {
              let colorClass = "";
              if (tag === "video") colorClass = "bg-red-200";
              else if (tag === "trắc nghiệm") colorClass = "bg-blue-200";
              else if (tag === "tự luận") colorClass = "bg-green-200";
              return (
                <Badge key={tag} className={colorClass}>
                  {tag}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
      <button className="rounded-full p-2 hover:bg-gray-100">
        <MoreHorizontal className="h-5 w-5" />
      </button>
    </CardContent>
  </Card>
);
