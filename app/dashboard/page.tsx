import { Card } from "@/components/ui/card";
import { ArrowRightIcon, Building2Icon } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-5">
        <h1 className="font-semibold text-3xl">Bem-vindo ao Portal Estapar B2B</h1>
        <p className="text-muted-foreground sm:max-w-[760px]">
          Gerencie seus serviços de estacionamento, acesse relatórios, configure credenciados e contrate planos de
          mensalidade em um só lugar.
        </p>
      </div>
      <div className="grid sm:grid-cols-2">
        <Link href={"/dashboard/garages"}>
          <Card className="p-6 relative cursor-pointer hover:bg-foreground/5">
            <ArrowRightIcon className="absolute top-6 right-6 text-foreground/20 w-6 h-6" />
            <Building2Icon className="text-primary w-9 h-9" />
            <div>
              <span className="font-semibold text-xl">Garagens</span>
              <p className="text-muted-foreground">Veja a lista de garagens disponiveis e suas configurações.</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
