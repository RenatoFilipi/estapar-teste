"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import {
  Building2Icon,
  BuildingIcon,
  CarIcon,
  CircleDollarSignIcon,
  CurrencyIcon,
  Loader2Icon,
  MapPinIcon,
  PenBoxIcon,
  PlusIcon,
  UsersIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import { QRCodeSVG } from "qrcode.react";
import { StateType } from "@/utils/types";
import { getGarageAction, getPlansAction } from "@/app/actions/request-actions";
import { GarageDetailsProps, PlanProps } from "@/utils/interfaces";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import ManagePlan from "./manage-plan";

const ManageGarage = ({ children, garageId }: { children: React.ReactNode; garageId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="min-w-[70%]">
        <SheetHeader className="hidden">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Content garageId={garageId} />
      </SheetContent>
    </Sheet>
  );
};

const Content = ({ garageId }: { garageId: string }) => {
  const [state, setState] = useState<StateType>("idle");
  const [garage, setGarage] = useState<GarageDetailsProps | null>(null);
  const [plans, setPlans] = useState<PlanProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState("loading");
        const token = localStorage.getItem("token") as string;
        const [responseGarage, responsePlans] = await Promise.all([
          getGarageAction(garageId, token),
          getPlansAction(garageId, token),
        ]);
        setGarage(responseGarage as GarageDetailsProps);
        setPlans(responsePlans as PlanProps[]);
        console.log(responsePlans);
        setState("idle");
      } catch (error) {
        console.error(error);
        setState("error");
      }
    };

    fetchData();
  }, [garageId]);

  if (state === "loading") {
    return (
      <div className="p-7 flex justify-center items-center w-full h-full flex-col gap-4">
        <Loader2Icon className="animate-spin text-primary w-8 h-8" />
        <span className="text-sm text-muted-foreground">Carregando detalhes da garagem...</span>
      </div>
    );
  }

  try {
    return (
      <div className="p-7 grid gap-8">
        <div className="grid gap-2">
          <div className="flex justify-start items-center gap-3">
            <Building2Icon className="w-6 h-6" />
            <h1 className="font-bold text-2xl">{garage?.name}</h1>
          </div>
          <span className="text-muted-foreground mb-3 text-sm">Código: {garage?.code}</span>
          <span className="text-muted-foreground flex items-center gap-2">
            <MapPinIcon className="w-4 h-4" /> {garage?.address}
          </span>
          <span className="text-muted-foreground flex items-center gap-2">
            <BuildingIcon className="w-4 h-4" /> {garage?.subsidiary} - {garage?.state} • Regional: {garage?.region}
          </span>
        </div>
        <div className="grid gap-7">
          <div className="flex justify-start items-center w-full bg-foreground/5 pt-1 px-1 rounded-t-sm h-11 pb-0">
            <button className="bg-background h-full rounded-t-sm relative px-4 font-medium">
              Mensalista Digital
              <div className="bg-[#3CB87E] absolute bottom-0 left-0 right-0 h-0.5"></div>
            </button>
          </div>
          <div className="px-4 grid gap-6">
            <div className="flex w-full gap-6">
              <div className="grid sm:grid-cols-3 gap-6 w-full">
                <CardUI
                  label="Total de vagas"
                  icon={<UsersIcon className="text-muted-foreground" />}
                  value={garage?.countSpaces.toString() ?? "--"}
                />
                <CardUI
                  label="Ocupadas"
                  icon={<UsersIcon className="text-[#EF7404]" />}
                  value={garage?.occupiedSpaces.toString() ?? "--"}
                />
                <CardUI
                  label="Disponiveis"
                  icon={<UsersIcon className="text-primary" />}
                  value={((garage?.countSpaces ?? 0) - (garage?.occupiedSpaces ?? 0)).toString() ?? "--"}
                />
              </div>
              <QRCodeSVG value="https://reactjs.org/" />
            </div>
            <Card className="flex w-full p-0 flex-row">
              <div className="flex flex-col w-[200px] border">
                <div className="flex justify-start items-center gap-2 w-full p-3 px-4 relative">
                  <CircleDollarSignIcon className="text-muted-foreground w-5 h-5" />
                  <span className="">Planos</span>
                  <div className="bg-primary absolute top-0 left-0 bottom-0 w-1"></div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-4">
                <div className="p-4 pb-0 flex justify-between items-center w-full">
                  <h2>Planos Disponiveis</h2>
                  <ManagePlan>
                    <Button
                      variant={"outline"}
                      className="border-[#3CB87E] text-[#3CB87E] hover:text-[#3CB87E]"
                      size={"sm"}>
                      <PlusIcon />
                      Novo Plano
                    </Button>
                  </ManagePlan>
                </div>
                <div className="overflow-x-auto p-4 pt-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground">Descrição</TableHead>
                        <TableHead className="text-foreground">Valor</TableHead>
                        <TableHead className="text-foreground">Vagas</TableHead>
                        <TableHead className="text-foreground">Ocupadas</TableHead>
                        <TableHead className="text-foreground">Disponiveis</TableHead>
                        <TableHead className="text-foreground">Status</TableHead>
                        <TableHead className="text-right text-foreground">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plans.map((plan) => {
                        const status = plan.active ? "Ativo" : "Inativo";
                        const priceBRL = (plan.priceInCents / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        });
                        return (
                          <TableRow key={plan.idPlan} className="text-muted-foreground">
                            <TableCell>
                              <div className="flex justify-start items-center gap-2">
                                <CarIcon className="w-5 h-5" />
                                {plan.description}
                              </div>
                            </TableCell>
                            <TableCell>{priceBRL}</TableCell>
                            <TableCell>{plan.totalVacancies}</TableCell>
                            <TableCell>{plan.totalVacancies}</TableCell>
                            <TableCell>{plan.totalVacancies}</TableCell>
                            <TableCell>
                              <Badge variant={"outline"} className="bg-foreground/5 text-muted-foreground">
                                {status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <ManagePlan plan={plan}>
                                <Button variant={"ghost"} size={"sm"}>
                                  <PenBoxIcon className="w-6 h-6" />
                                </Button>
                              </ManagePlan>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="flex flex-col justify-center items-center w-full py-20 gap-4">
        <div className="flex justify-center items-center p-3 rounded-sm bg-foreground/5">
          <Building2Icon className="text-primary w-7 h-7" />
        </div>
        <span>Alguma coisa deu errado, tente mais tarde.</span>
      </div>
    );
  }
};

const CardUI = ({ icon, label, value }: { label: string; icon: React.ReactNode; value: string }) => {
  return (
    <Card className="p-6 gap-3">
      <h1 className="font-semibold text-muted-foreground">{label}</h1>
      <span className="flex justify-start items-center gap-3 text-2xl font-bold">
        {icon}
        {value}
      </span>
    </Card>
  );
};

export default ManageGarage;
