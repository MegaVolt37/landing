import type { Unit } from './types';

export function mapSheetToUnits(data: any): Unit[] {
  const rows = data.values as string[][];

  // Найдём индексы блоков
  const idxAvailable = rows.findIndex(r => r.includes("Available"));
  const idxDaily = rows.findIndex(r => r.includes("Daily rentals strategy"));
  const idxMonthly = rows.findIndex(r => r.includes("Monthly rentals strategy"));

  // --- Available (основные данные юнитов)
  const availableRows = rows.slice(idxAvailable + 2, idxDaily - 2).filter(r => r[4]?.startsWith("Unit"));
  const dailyRows = rows.slice(idxDaily + 2, idxMonthly - 2).filter(r => r[4]?.startsWith("Unit"));
  const monthlyRows = rows.slice(idxMonthly + 2).filter(r => r[4]?.startsWith("Unit"));

  const units: Unit[] = availableRows.map(av => {
    const id = av[4];
    const typology = av[15];
    const [bedroomsRaw, finishRaw] = typology.split(" ");
    const bedrooms = parseInt(bedroomsRaw);
    const finish = finishRaw || "";

    const daily = dailyRows.find(r => r[4] === id);
    const monthly = monthlyRows.find(r => r[4] === id);

    return {
      id,
      typology,
      bedrooms,
      finish,
      available: av[5] === "yes",
      gba: av[6],
      land: av[7],
      pool: av[8],
      footprint: av[9],
      garden: av[10],
      finalPrice: av[13],
      priceUsd: av[14],
      daily: daily
        ? {
          adr: daily[6],
          occupancy: daily[7],
          monthly: daily[8],
          net: daily[12], // Investor proceedings
          roiAnnual: daily[17],
        }
        : {
          adr: "",
          occupancy: "",
          monthly: "",
          net: "",
          roiAnnual: "",
        },
      monthly: monthly
        ? {
          price: monthly[6],
          occupancy: monthly[7],
          net: monthly[12], // Investor proceedings
          roiAnnual: monthly[17],
        }
        : {
          price: "",
          occupancy: "",
          net: "",
          roiAnnual: "",
        },
    };
  });

  return units;
}