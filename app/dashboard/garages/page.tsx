import { garage } from "@/app/utils/interfaces";
import ManageGarage from "@/components/core/manage-garage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2Icon, EyeIcon, SearchIcon } from "lucide-react";

export const garages: garage[] = [
  {
    code: "000610",
    name: "ACYR DE ANDRADE (GMC PARK)",
    address: "RUA JOAQUIM FLORIANO, 620",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "SP1",
  },
  {
    code: "000611",
    name: "PARADISE GARDEN (GMC PARK)",
    address: "RUA SAMPAIO VIANA, 425",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "SP1",
  },
  {
    code: "000613",
    name: "GRANDE AVENIDA (NEXT)",
    address: "AV. NOVE DE JULHO, 5525",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "SP1",
  },
  {
    code: "000614",
    name: "CLUBE DO BANESPA (AUTO VAGAS)",
    address: "RUA SEBASTIAO / SANTO AMARO, 270",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "Franquias",
  },
  {
    code: "000615",
    name: "COMENDADOR - FNAC (AUTO VAGAS)",
    address: "AL. SANTOS, 960",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "SP1",
  },
  {
    code: "000626",
    name: "CASA DEL LAVORO (C3 PARKING)",
    address: "AL. RIBEIRAO PRETO, 130",
    city: "SAO PAULO",
    federativeUnit: "SP",
    region: "SP1",
  },
  {
    code: "001669",
    name: "ED COM LIZ EMPRESARIAL - WP",
    address: "RUA FREDERICO SIMOES, 125, EDIF LIZ EMPR",
    city: "SALVADOR",
    federativeUnit: "BA",
    region: "NE",
  },
  {
    code: "002132",
    name: "SHOP POWER CENTER MINAS",
    address: "AVENIDA PASTOR ANSELMO SILVESTRE, 1495",
    city: "BELO HORIZONTE",
    federativeUnit: "MG",
    region: "MG",
  },
  {
    code: "002337",
    name: "ED COM VERTICE VALINHOS",
    address: "R LUIZ SPIANDORELLI NETO, 30",
    city: "VALINHOS",
    federativeUnit: "SP",
    region: "SP1",
  },
];

const Garages = () => {
  return (
    <div className="grid gap-8">
      {/* header */}
      <div className="grid gap-1">
        <div className="flex justify-start items-center gap-3">
          <Building2Icon className="text-primary w-7 h-7" />
          <h1 className="font-semibold text-xl">Garagens</h1>
        </div>
        <p className="text-muted-foreground">Visualize as garagens habilitadas para mensalistas digitais.</p>
      </div>
      {/* mid */}
      <Card className="flex justify-between items-center sm:flex-row px-5 py-4">
        <div className="flex justify-center items-center gap-3">
          <Switch id="monthly-payer" defaultChecked />
          <Label htmlFor="monthly-payer" className="font-semibold">
            Mensalista Digital
          </Label>
        </div>
        <span className="text-muted-foreground">25 registros</span>
        <div className="relative">
          <Input id="user" className="peer ps-9" placeholder="Buscar por nome" type="text" />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} aria-hidden="true" />
          </div>
        </div>
      </Card>
      {/* table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Código</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Cidade/UF</TableHead>
              <TableHead>Regional</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {garages.map((garage) => {
              return (
                <TableRow key={garage.code}>
                  <TableCell>{garage.code}</TableCell>
                  <TableCell>{garage.name}</TableCell>
                  <TableCell>{garage.address}</TableCell>
                  <TableCell>
                    {garage.city}/{garage.federativeUnit}
                  </TableCell>
                  <TableCell>{garage.region}</TableCell>
                  <TableCell className="text-right">
                    <ManageGarage garage={garage}>
                      <Button variant={"ghost"} size={"sm"}>
                        <EyeIcon className="w-6 h-6" />
                      </Button>
                    </ManageGarage>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Garages;
