import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import type { RecentActivityData } from "@/types/dashboard";
import type { FC } from "react";

export const RecentActivitySection: FC<{
  activities: RecentActivityData[];
}> = ({ activities }) => (
  <Card>
    <CardHeader>
      <CardTitle>Hoạt động gần đây</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-6">
      {activities.map((activity, index) => (
        <div className="flex items-center gap-4" key={index}>
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src={activity.student.avatarUrl} alt="Avatar" />
            <AvatarFallback>
              {getInitials(activity.student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.student.name}</span>{" "}
              {activity.action}{" "}
              <span className="font-semibold">"{activity.target}"</span>
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);
