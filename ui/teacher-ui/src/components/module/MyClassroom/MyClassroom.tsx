import { teacherInfoData } from "@/types/myClass";
import { ClassHeader } from "./ClassHeader";
import { ClassIntroduction } from "./ClassIntroduction";

import { TabContent } from "./TabContent";

export const MyClassroom = () => {
  const teacherInfo = teacherInfoData;

  return (
    <div className="min-h-screen w-full bg-white p-8 font-mono">
      <div className="mx-auto max-w-6xl">
        <ClassHeader teacherInfo={teacherInfo} />
        <ClassIntroduction />
        <div className="block mt-8">
          <TabContent />
        </div>
      </div>
    </div>
  );
};
