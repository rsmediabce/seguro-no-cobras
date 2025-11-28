// src/data/provinces.ts
// Definición de provincias y localidades con índices de riesgo para seguros

export interface Location {
  id: number;
  name: string;
  riskIndex: number; // 1-10 donde 1 es muy seguro, 10 es muy riesgoso
}

export interface Province {
  id: number;
  name: string;
  locations: Location[];
}

export const provincesData: Province[] = [
  {
    id: 1,
    name: "Buenos Aires",
    locations: [
      { id: 1, name: "CABA", riskIndex: 3 },
      { id: 2, name: "La Plata", riskIndex: 4 },
      { id: 3, name: "Mar del Plata", riskIndex: 3 },
      { id: 4, name: "Balcarce", riskIndex: 2 },
      { id: 5, name: "Tandil", riskIndex: 2 },
      { id: 6, name: "Bahía Blanca", riskIndex: 4 },
      { id: 7, name: "San Isidro", riskIndex: 2 },
      { id: 8, name: "Tigre", riskIndex: 3 },
      { id: 9, name: "Pilar", riskIndex: 3 },
      { id: 10, name: "Zona Norte (GBA)", riskIndex: 3 },
      { id: 11, name: "Zona Oeste (GBA)", riskIndex: 5 },
      { id: 12, name: "Zona Sur (GBA)", riskIndex: 6 }
    ]
  },
  {
    id: 2,
    name: "Córdoba",
    locations: [
      { id: 11, name: "Córdoba Capital", riskIndex: 3 },
      { id: 12, name: "Villa María", riskIndex: 2 },
      { id: 13, name: "Río Cuarto", riskIndex: 2 },
      { id: 14, name: "Alta Gracia", riskIndex: 2 },
      { id: 15, name: "Carlos Paz", riskIndex: 2 },
      { id: 16, name: "Jesús María", riskIndex: 1 },
      { id: 17, name: "La Falda", riskIndex: 1 },
      { id: 18, name: "Mina Clavero", riskIndex: 1 }
    ]
  },
  {
    id: 3,
    name: "Santa Fe",
    locations: [
      { id: 19, name: "Rosario", riskIndex: 5 },
      { id: 20, name: "Santa Fe Capital", riskIndex: 4 },
      { id: 21, name: "Rafaela", riskIndex: 2 },
      { id: 22, name: "Venado Tuerto", riskIndex: 2 },
      { id: 23, name: "San Lorenzo", riskIndex: 3 },
      { id: 24, name: "Reconquista", riskIndex: 3 }
    ]
  },
  {
    id: 4,
    name: "Mendoza",
    locations: [
      { id: 25, name: "Mendoza Capital", riskIndex: 3 },
      { id: 26, name: "San Rafael", riskIndex: 2 },
      { id: 27, name: "Godoy Cruz", riskIndex: 3 },
      { id: 28, name: "Guaymallén", riskIndex: 3 },
      { id: 29, name: "Luján de Cuyo", riskIndex: 2 },
      { id: 30, name: "Maipú", riskIndex: 2 }
    ]
  },
  {
    id: 5,
    name: "Tucumán",
    locations: [
      { id: 31, name: "San Miguel de Tucumán", riskIndex: 4 },
      { id: 32, name: "Yerba Buena", riskIndex: 2 },
      { id: 33, name: "Tafí Viejo", riskIndex: 3 },
      { id: 34, name: "Alderetes", riskIndex: 3 },
      { id: 35, name: "Banda del Río Salí", riskIndex: 4 }
    ]
  },
  {
    id: 6,
    name: "Entre Ríos",
    locations: [
      { id: 36, name: "Paraná", riskIndex: 3 },
      { id: 37, name: "Concordia", riskIndex: 3 },
      { id: 38, name: "Gualeguaychú", riskIndex: 2 },
      { id: 39, name: "Concepción del Uruguay", riskIndex: 2 },
      { id: 40, name: "Victoria", riskIndex: 2 }
    ]
  },
  {
    id: 7,
    name: "Salta",
    locations: [
      { id: 41, name: "Salta Capital", riskIndex: 4 },
      { id: 42, name: "San Ramón de la Nueva Orán", riskIndex: 5 },
      { id: 43, name: "Tartagal", riskIndex: 5 },
      { id: 44, name: "Cafayate", riskIndex: 2 },
      { id: 45, name: "Cerrillos", riskIndex: 3 }
    ]
  },
  {
    id: 8,
    name: "Misiones",
    locations: [
      { id: 46, name: "Posadas", riskIndex: 4 },
      { id: 47, name: "Oberá", riskIndex: 3 },
      { id: 48, name: "Eldorado", riskIndex: 3 },
      { id: 49, name: "San Vicente", riskIndex: 4 },
      { id: 50, name: "Puerto Iguazú", riskIndex: 3 }
    ]
  },
  {
    id: 9,
    name: "Chubut",
    locations: [
      { id: 51, name: "Comodoro Rivadavia", riskIndex: 4 },
      { id: 52, name: "Trelew", riskIndex: 3 },
      { id: 53, name: "Puerto Madryn", riskIndex: 2 },
      { id: 54, name: "Esquel", riskIndex: 2 },
      { id: 55, name: "Rawson", riskIndex: 2 }
    ]
  },
  {
    id: 10,
    name: "Neuquén",
    locations: [
      { id: 56, name: "Neuquén Capital", riskIndex: 3 },
      { id: 57, name: "Cutral Có", riskIndex: 3 },
      { id: 58, name: "Plottier", riskIndex: 2 },
      { id: 59, name: "Centenario", riskIndex: 2 },
      { id: 60, name: "San Martín de los Andes", riskIndex: 1 }
    ]
  }
];