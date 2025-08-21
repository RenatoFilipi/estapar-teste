"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/core/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col w-full">
          <div className="flex w-full justify-between items-center px-6 sm:px-10 py-3">
            <SidebarTrigger className="" />
            <div className="flex justify-end items-center w-full gap-3">
              <span className="flex justify-center items-center gap-2 text-muted-foreground">
                <UserIcon className="w-4 h-4" />
                <span className="text-sm">Roberto Freitas</span>
              </span>
              <Button onClick={onLogout} variant="ghost" className="text-muted-foreground">
                <LogInIcon /> Sair
              </Button>
            </div>
          </div>

          <main className="p-6 sm:p-10 flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
