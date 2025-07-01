import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { routeData } from "@/types/navigation";
import { NavProjects } from "./nav-projects";

// This is sample data.
const data = routeData;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects items_data={data.items} />
        <NavMain items={data.items_class} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
