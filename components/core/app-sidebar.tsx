import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Brand from "./brand";
import Link from "next/link";
import { Building2Icon } from "lucide-react";
import ModeToggle from "./mode-toggle";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="px-5 py-3">
          <Link href={"/dashboard"}>
            <Brand className="h-8" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="p-2">
                <SidebarMenuButton asChild>
                  <Link href={"/dashboard/garages"}>
                    <Building2Icon className="" />
                    Garagens
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-5">
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
