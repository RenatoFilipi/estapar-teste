export interface GarageProps {
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  region: string;
}

export interface GarageDetailsProps {
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  region: string;
  subsidiary: string;
  countSpaces: number;
  occupiedSpaces: number;
  maxDiscountPercent: number;
}

export interface PlanProps {
  idPlan: number;
  idGarage: number;
  description: string;
  startValidity: string;
  endValidity: string | null;
  priceInCents: number;
  active: boolean;
  descriptionAvailable: string;
  amountDailyCancellationInCents: number;
  veichleType: number;
  totalVacancies: number;
}
