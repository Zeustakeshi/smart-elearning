import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UpcomingClassData } from "@/types/dashboard";
import { ArrowRightIcon } from "lucide-react";
import type { FC } from "react";

export const UpcomingClassesSection: FC<{ classes: UpcomingClassData[] }> = ({
  classes,
}) => (
  <Card className="xl:col-span-2">
    <CardHeader>
      <CardTitle>Lịch dạy hôm nay</CardTitle>
      <CardDescription>
        Các lớp học được lên lịch cho ngày hôm nay.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thời gian</TableHead>
            <TableHead>Tên lớp</TableHead>
            <TableHead>Môn học</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>
              <span className="sr-only">Hành động</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((session) => (
            <TableRow key={session.className}>
              <TableCell>{session.time}</TableCell>
              <TableCell className="font-medium">{session.className}</TableCell>
              <TableCell>{session.subject}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    session.status === "Đang diễn ra"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {session.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button size="sm">
                  Vào lớp <ArrowRightIcon className="h-4 w-4 ml-2" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);
