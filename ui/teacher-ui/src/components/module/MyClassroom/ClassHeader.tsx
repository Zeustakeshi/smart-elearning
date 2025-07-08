import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TeacherInfo } from "@/types/myClass";
import { Pencil } from "lucide-react";

export const ClassHeader = ({ teacherInfo }: { teacherInfo: TeacherInfo }) => (
  <Card className="p-4">
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <div className="relative h-32 w-32 rounded-lg border-2 flex items-center justify-center ">
          <img
            src="https://i.pinimg.com/736x/0b/97/6f/0b976f0a7aa1aa43870e1812eee5a55d.jpg"
            alt="avt"
            className="w-28 h-28 rounded-2xl object-cover"
          />
          <button className="absolute -right-2 -top-2 rounded-full border-1 bg-white p-2">
            <Pencil className="h-3 w-3" />
          </button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">Tên lớp học</h1>
            <Pencil className="h-5 w-5 cursor-pointer" />
          </div>
          <div className="flex gap-2">
            <Button className="border-2 border-gray-400">
              Quản lý học sinh
            </Button>
            <Button variant={"secondary"}>Quản lý lớp học</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"secondary"}>Hủy</Button>
        <Button variant={"secondary"}>Lưu</Button>
        <button className="rounded-full border-2  bg-white p-1">
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="mt-4 flex items-end justify-between">
      <div>
        <h3 className="font-bold">
          Thông tin giáo viên{" "}
          <Pencil className="inline h-4 w-4 cursor-pointer" />
        </h3>
        <p className="text-sm">Họ và tên: {teacherInfo.name}</p>
        <p className="text-sm">Số điện thoại: {teacherInfo.phone}</p>
        <p className="text-sm">Email: {teacherInfo.email}</p>
      </div>
      <p className="font-bold">Mã lớp: #TESJESIS</p>
    </div>
  </Card>
);
