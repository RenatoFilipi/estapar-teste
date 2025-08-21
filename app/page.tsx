"use client";

import Brand from "@/components/core/brand";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon, LockIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { StateType } from "@/utils/types";
import { toast } from "sonner";
import { loginAction } from "./actions/request-actions";

const Home = () => {
  const router = useRouter();
  const [state, setState] = useState<StateType>("idle");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const loginSchema = z.object({
    user: z.string().min(1, "Usuário é obrigatório"),
    password: z.string().min(1, "Senha é obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setState("loading");
      const token = await loginAction(values.user, values.password);
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao tentar entrar, tente novamente.");
    } finally {
      setState("idle");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-dvh relative bg-[#F4F4F4] dark:bg-background">
      <div className="relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2">
          <Brand className="h-10" />
        </div>
        <Card className="px-6 py-6 relative sm:w-[460px]">
          <h1 className="text-sm font-bold mb-6">Entre com suas credenciais para acessar o sistema</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="user">Usuário</Label>
              <div className="relative">
                <Input
                  id="user"
                  className="peer ps-9"
                  placeholder="Digite seu usuário"
                  type="text"
                  {...register("user")}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <UserIcon size={16} aria-hidden="true" />
                </div>
              </div>
              {errors.user && <span className="text-sm text-red-500">{errors.user.message}</span>}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  className="peer ps-9"
                  placeholder="Digite sua senha"
                  type="password"
                  {...register("password")}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <LockIcon size={16} aria-hidden="true" />
                </div>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            <Button className="w-full" type="submit" disabled={state === "loading"}>
              {state === "loading" && <Loader2Icon className="w-4 h-4 animate-spin" />}
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Home;
