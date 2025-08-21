/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { SetStateType, StateType } from "@/utils/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { PlanProps } from "@/utils/interfaces";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "../ui/switch";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { createPlanAction } from "@/app/actions/request-actions";

function toDateInput(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (value.includes("T")) return value.split("T")[0];
  return value.slice(0, 10);
}

const ManagePlan = ({ plan, children }: { children: React.ReactNode; plan?: PlanProps }) => {
  const [open, setOpen] = useState(false);
  const title = !plan ? "Novo Plano" : "Plano";
  const description = !plan ? "Preencha os dados para criar um novo plano" : "Altere os dados para atualizar plano";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col">
        <DialogHeader className="h-fit">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Content setOpen={setOpen} plan={plan} />
      </DialogContent>
    </Dialog>
  );
};

const Content = ({ plan, setOpen }: { plan?: PlanProps; setOpen: SetStateType<boolean> }) => {
  const [state, setState] = useState<StateType>("idle");

  const formSchema = z
    .object({
      description: z.string().min(1, "Descrição obrigatória"),
      active: z.boolean(),
      veichleType: z.string().min(1, "Selecione um tipo de veículo"),
      totalVacancies: z.number().min(1, "Deve ser maior que 0"),
      priceInCents: z.number().min(0, "Deve ser maior ou igual a 0"),
      amountDailyCancellationInCents: z.number().min(0, "Deve ser maior ou igual a 0"),
      startValidity: z.string().min(1, "Informe a data inicial"),
      endValidity: z.string().optional(),
    })
    .refine(
      (data) => {
        if (!data.endValidity) return true;
        return new Date(data.endValidity) > new Date(data.startValidity);
      },
      {
        message: "Fim da validade deve ser maior que início",
        path: ["endValidity"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: plan
      ? {
          description: plan.description,
          active: plan.active,
          veichleType: (plan as any).VeichleType?.toString() ?? (plan as any).veichleType?.toString() ?? "",
          totalVacancies: plan.totalVacancies,
          priceInCents: plan.priceInCents / 100,
          amountDailyCancellationInCents: plan.amountDailyCancellationInCents / 100,
          startValidity: toDateInput(plan.startValidity),
          endValidity: toDateInput(plan.endValidity),
        }
      : {
          description: "",
          active: true,
          veichleType: "",
          totalVacancies: 1,
          priceInCents: 0,
          amountDailyCancellationInCents: 0,
          startValidity: format(new Date(), "yyyy-MM-dd"),
          endValidity: undefined,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (plan) {
      setOpen(false);
      return;
    }
    try {
      setState("loading");
      const params: PlanProps = {
        idPlan: 1,
        idGarage: 1000,
        description: values.description,
        startValidity: values.startValidity,
        endValidity: values.endValidity ?? null,
        priceInCents: values.priceInCents * 100,
        active: values.active,
        descriptionAvailable: "",
        amountDailyCancellationInCents: values.amountDailyCancellationInCents * 100,
        totalVacancies: values.totalVacancies,
        veichleType: Number(values.veichleType),
      };
      console.log("Params:", params);
      const token = localStorage.getItem("token") as string;
      await createPlanAction(params, token);
      toast.success("Plano criado.");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado, tente novamente mais tarde.");
    } finally {
      setState("idle");
      setOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição do plano" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                    <Label className={`${field.value ? "text-green-500" : "text-red-500"}`}>
                      {field.value ? "Ativo" : "Inativo"}
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="veichleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Veículo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full h-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Carro</SelectItem>
                    <SelectItem value="2">Moto</SelectItem>
                    <SelectItem value="3">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalVacancies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total de Vagas</FormLabel>
                <FormControl>
                  <Input type="number" value={field.value} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="priceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amountDailyCancellationInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do Cancelamento (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="startValidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Início da Validade</FormLabel>
                <FormControl>
                  <Input type="date" value={field.value ?? ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endValidity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fim da Validade</FormLabel>
                <FormControl>
                  <Input type="date" value={field.value ?? ""} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button disabled={state === "loading"} type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit" disabled={state === "loading"}>
            {state === "loading" && <Loader2Icon className="w-4 h-4 animate-spin" />} {!plan ? "Criar" : "Atualizar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ManagePlan;
