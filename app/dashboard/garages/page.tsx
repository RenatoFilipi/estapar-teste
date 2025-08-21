"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGaragesAction } from "@/app/actions/request-actions";
import { GarageProps } from "@/utils/interfaces";
import GaragesTable from "@/components/core/garages-table";
import { Building2Icon, Loader2Icon, XIcon } from "lucide-react";
import { StateType } from "@/utils/types";

const Garages = () => {
  const router = useRouter();
  const [garages, setGarages] = useState<GarageProps[]>([]);
  const [state, setState] = useState<StateType>("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchGarages = async () => {
      try {
        const response = await getGaragesAction(1, 10, token);
        setGarages(response.data as GarageProps[]);
        setState("idle");
      } catch (error) {
        setState("error");
        console.error("Erro ao buscar garagens:", error);
      }
    };

    fetchGarages();
  }, [router]);

  if (state === "loading") {
    return (
      <div className="grid gap-8">
        <div className="grid gap-1">
          <div className="flex justify-start items-center gap-3">
            <Building2Icon className="text-primary w-7 h-7" />
            <h1 className="font-semibold text-xl">Garagens</h1>
          </div>
          <p className="text-muted-foreground">Visualize as garagens habilitadas para mensalistas digitais.</p>
        </div>
        <div className="flex justify-center items-center  flex-col gap-3 h-64">
          <Loader2Icon className="w-8 h-8 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Carregando garagens...</span>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="grid gap-8">
        <div className="grid gap-1">
          <div className="flex justify-start items-center gap-3">
            <Building2Icon className="text-primary w-7 h-7" />
            <h1 className="font-semibold text-xl">Garagens</h1>
          </div>
          <p className="text-muted-foreground">Visualize as garagens habilitadas para mensalistas digitais.</p>
        </div>
        <div className="flex justify-center items-center  flex-col gap-3 h-64">
          <XIcon className="w-8 h-8 text-primary animate-spin" />
          <span className="text-sm text-muted-foreground">Algo deu errado, tente novamente mais tarde.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-1">
        <div className="flex justify-start items-center gap-3">
          <Building2Icon className="text-primary w-7 h-7" />
          <h1 className="font-semibold text-xl">Garagens</h1>
        </div>
        <p className="text-muted-foreground">Visualize as garagens habilitadas para mensalistas digitais.</p>
      </div>
      <GaragesTable garages={garages} />
    </div>
  );
};

export default Garages;
