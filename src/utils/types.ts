export interface IFilterMap {
  label: string,
  value: string,
  id: string,
}

export interface Unit {
  id: string;
  typology: string;
  bedrooms: number;
  finish: string;
  available: boolean;
  gba: string;
  land: string;
  pool: string;
  footprint: string;
  garden: string;
  finalPrice: string;
  priceUsd: string;
  daily: {
    adr: string;
    occupancy: string;
    monthly: string;
    net: string;
    roiAnnual: string;
  };
  monthly: {
    price: string;
    occupancy: string;
    net: string;
    roiAnnual: string;
  };
}