"use client";

import { useState } from "react";
import { useMedia } from "react-use";
import { minWidth640 } from "@/app/utils/contants";
import { garage } from "@/app/utils/interfaces";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Building2Icon, BuildingIcon, MapPin, MapPinIcon, UsersIcon } from "lucide-react";
import { Card } from "../ui/card";
import { QRCodeSVG } from "qrcode.react";

const ManageGarage = ({ children, garage }: { children: React.ReactNode; garage: garage }) => {
  const isDesktop = useMedia(minWidth640);
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="min-w-[90%]">
          <SheetHeader className="hidden">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <Content garage={garage} />
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="min-h-[90%]">
        <DrawerHeader className="hidden">
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <Content garage={garage} />
      </DrawerContent>
    </Drawer>
  );
};

const Content = ({ garage }: { garage: garage }) => {
  return (
    <div className="p-7 grid gap-8">
      {/* header */}
      <div className="grid gap-2">
        <div className="flex justify-start items-center gap-3">
          <Building2Icon className="w-6 h-6" />
          <h1 className="font-bold text-2xl">{garage.name}</h1>
        </div>
        <span className="text-muted-foreground mb-3 text-sm">Código: {garage.code} -</span>
        <span className="text-muted-foreground flex items-center gap-2">
          <MapPinIcon className="w-4 h-4" /> {garage.address}
        </span>
        <span className="text-muted-foreground flex items-center gap-2">
          <BuildingIcon className="w-4 h-4" /> NOME PLACEHOLDER - {garage.federativeUnit} • Regional: {garage.region}
        </span>
      </div>
      {/* content */}
      <div className="grid gap-7">
        {/* tabs */}
        <div className="flex justify-start items-center w-full bg-foreground/5 pt-1 px-1 rounded-t-sm h-11 pb-0">
          <button className="bg-background h-full rounded-t-sm relative px-4 font-medium">
            Mensalista Digital
            <div className="bg-[#3CB87E] absolute bottom-0 left-0 right-0 h-0.5"></div>
          </button>
        </div>
        {/* body */}
        <div className="px-4">
          {/* cards */}
          <div className="flex w-full gap-6">
            <div className="grid sm:grid-cols-3 gap-6 w-full">
              <CardUI label="Total de vagas" icon={<UsersIcon className="text-muted-foreground" />} value="35" />
              <CardUI label="Ocupadas" icon={<UsersIcon className="text-[#EF7404]" />} value="0" />
              <CardUI label="Disponiveis" icon={<UsersIcon className="text-primary" />} value="35" />
            </div>
            <QRCodeSVG value="https://reactjs.org/" />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardUI = ({ icon, label, value }: { label: string; icon: React.ReactNode; value: string }) => {
  return (
    <Card className="p-8 gap-3">
      <h1 className="font-semibold text-muted-foreground">{label}</h1>
      <span className="flex justify-start items-center gap-3 text-2xl font-bold">
        {icon}
        {value}
      </span>
    </Card>
  );
};

export default ManageGarage;
