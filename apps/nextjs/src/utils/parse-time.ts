type label = Record<string, { singular: string; plural: string }>;
const timeRangeLabels: label = {
  hora: { singular: "hora", plural: "horas" },
  dia: { singular: "día", plural: "días" },
  semana: { singular: "semana", plural: "semanas" },
  mes: { singular: "mes", plural: "meses" },
};

export const parseTimeRange = (timeRange: number, timeRangeType: string) => {
  if (!timeRangeType || !timeRange) {
    return "";
  }

  const label = timeRangeLabels[timeRangeType];

  if (!label) {
    return "";
  }

  return timeRange === 1 ? label.singular : label.plural;
};
