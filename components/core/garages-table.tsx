"use client";

import { useState } from "react";
import { GarageProps } from "@/utils/interfaces";
import ManageGarage from "@/components/core/manage-garage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EyeIcon, SearchIcon } from "lucide-react";

interface GaragesTableProps {
  garages: GarageProps[];
}

const GaragesTable = ({ garages }: GaragesTableProps) => {
  const [search, setSearch] = useState("");

  const filteredGarages = garages.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()));
  const recordsLabel = filteredGarages.length === 1 ? `1 registro` : `${filteredGarages.length} registros`;

  return (
    <>
      <Card className="flex justify-between items-center sm:flex-row px-5 py-4 gap-4">
        <div className="flex justify-center items-center gap-3">
          <Switch id="monthly-payer" defaultChecked />
          <Label htmlFor="monthly-payer" className="font-semibold">
            Mensalista Digital
          </Label>
        </div>

        <span className="text-muted-foreground">{recordsLabel}</span>

        <div className="relative w-64">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="peer ps-9"
            placeholder="Buscar por nome"
            type="text"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} aria-hidden="true" />
          </div>
        </div>
      </Card>
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
            {filteredGarages.map((garage) => (
              <TableRow key={garage.code}>
                <TableCell>{garage.code}</TableCell>
                <TableCell>{garage.name}</TableCell>
                <TableCell>{garage.address}</TableCell>
                <TableCell>
                  {garage.city}/{garage.state}
                </TableCell>
                <TableCell>{garage.region}</TableCell>
                <TableCell className="text-right">
                  <ManageGarage garageId={garage.code}>
                    <Button variant={"ghost"} size={"sm"}>
                      <EyeIcon className="w-6 h-6" />
                    </Button>
                  </ManageGarage>
                </TableCell>
              </TableRow>
            ))}
            {filteredGarages.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhuma garagem encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default GaragesTable;
