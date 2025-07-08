import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { DocumentType } from "@/types/mydoc";
import { FileText, MoreHorizontal, Share2, Trash2 } from "lucide-react";

export const DocCard = ({ plan }: { plan: DocumentType }) => {
  return (
    <Card className="w-full ">
      <CardContent className="flex items-center justify-between h-full p-4">
        <div className="flex items-center gap-4 ">
          <div className="flex flex-col items-center justify-center w-16 h-16 border-2  border-red-500 rounded-lg bg-red-50/50">
            <FileText className="w-6 h-6 text-red-600" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-red-600 tracking-wider">
              {plan.fileType}
            </span>
          </div>
          <span className="font-medium text-gray-800">{plan.title}</span>
        </div>

        {/* Phần bên phải: Kích thước và menu */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{plan.size}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="ghost"
                className="flex h-9 w-9 items-center justify-center rounded-full border-1 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <MoreHorizontal className="h-5 w-5 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-mono">
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Xóa</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Chia sẻ</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};
