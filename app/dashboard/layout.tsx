"use client";

import ModeToggle from "@/components/core/mode-toggle";
import { Button } from "@/components/ui/button";
import { LogInIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const onLogout = () => {
    router.push("/");
  };

  return (
    <div className="">
      <div className="flex justify-end items-center w-full px-10 py-3 gap-3">
        <ModeToggle />
        <span className="flex justify-center items-center gap-2 text-muted-foreground">
          <UserIcon className="w-4 h-4" />
          <span className="text-sm">Roberto Freitas</span>
        </span>
        <Button onClick={onLogout} variant={"ghost"} className="text-muted-foreground">
          <LogInIcon /> Sair
        </Button>
      </div>
      <div className="p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
