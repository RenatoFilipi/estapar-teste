"use client";

import Brand from "@/components/core/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const onSubmit = () => {
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center w-full h-dvh relative bg-[#F4F4F4] dark:bg-background">
      <div className="relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <Brand className="h-10" />
        </div>
        <Card className="px-6 relative sm:w-[460px]">
          <h1 className="text-sm font-bold">Entre com suas credenciais para acessar o sistema</h1>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="user">Usuário</Label>
              <div className="relative">
                <Input id="user" className="peer ps-9" placeholder="Digite seu usuário" type="text" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <UserIcon size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input id="password" className="peer ps-9" placeholder="Digite sua senha" type="password" />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <LockIcon size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
            <Button className="w-full" onClick={onSubmit}>
              Entrar
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
