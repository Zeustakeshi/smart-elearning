import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BookIcon, File } from "lucide-react";

function TabContent() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea>
        <TabsList className="mb-3 h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse">
          <TabsTrigger
            value="tab-1"
            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
          >
            <BookIcon
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Bài Học
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="relative overflow-hidden rounded-none border border-border py-2 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-primary"
          >
            <File
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Tài Liệu
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Bài Học
        </p>
      </TabsContent>
      <TabsContent value="tab-2">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Tài Liệu
        </p>
      </TabsContent>
    </Tabs>
  );
}

export { TabContent };
