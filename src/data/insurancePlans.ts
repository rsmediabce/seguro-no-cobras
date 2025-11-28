// src/data/insurancePlans.ts
// Definición de planes de seguros para diferentes tipos de seguros

export interface InsurancePlan {
  value: string;
  label: string;
  description: string;
  details: string[];
  basePrice: number;
  coverageLimit: number;
}

export const homeInsurancePlans: InsurancePlan[] = [
  { 
    value: 'basico', 
    label: 'Plan Básico',
    description: 'Cobertura esencial para protección básica',
    details: [
      'Incendio y explosión',
      'Robo con fuerza (hasta $50,000)',
      'Responsabilidad civil',
      'Daños por agua'
    ],
    basePrice: 300,
    coverageLimit: 50000
  },
  { 
    value: 'estandar', 
    label: 'Plan Estándar',
    description: 'Protección balanceada para tu hogar',
    details: [
      'Todo lo del Plan Básico',
      'Robo total (hasta $100,000)',
      'Vandalismo',
      'Cristales',
      'Electrodomésticos'
    ],
    basePrice: 500,
    coverageLimit: 100000
  },
  { 
    value: 'full', 
    label: 'Plan Full',
    description: 'Cobertura completa con mayores límites',
    details: [
      'Todo lo del Plan Estándar',
      'Contenido del hogar (hasta $200,000)',
      'Accidentes personales',
      'Asistencia en el hogar',
      'Realojamiento temporal'
    ],
    basePrice: 800,
    coverageLimit: 200000
  },
  { 
    value: 'vip', 
    label: 'Plan VIP',
    description: 'Protección premium sin límites',
    details: [
      'Todo lo del Plan Full',
      'Cobertura ilimitada de contenido',
      'Joyas y objetos de valor',
      'Responsabilidad civil ampliada',
      'Asistencia legal',
      'Cobertura mundial'
    ],
    basePrice: 1200,
    coverageLimit: 0 // 0 significa ilimitado
  }
];


export const carInsurancePlans: InsurancePlan[] = [
  { 
    value: 'responsabilidad_civil', 
    label: 'Responsabilidad Civil',
    description: 'Cobertura legal mínima obligatoria',
    details: [
      'Daños a terceros hasta $5.000.000',
      'Gastos médicos a terceros',
      'Defensa legal',
      'Asistencia en viaje básica'
    ],
    basePrice: 800,
    coverageLimit: 5000000
  },
  { 
    value: 'todo_riesgo_terceros', 
    label: 'Todo Riesgo con Franquicia',
    description: 'Cobertura amplia con participación en siniestros',
    details: [
      'Todo lo de Responsabilidad Civil',
      'Daños totales y parciales por accidente',
      'Robo total e incendio',
      'Cristales y cerraduras',
      'Granizo y fenómenos naturales',
      'Franquicia del 10% en daños propios'
    ],
    basePrice: 1500,
    coverageLimit: 0 // Ilimitado
  },
  { 
    value: 'todo_riesgo_completo', 
    label: 'Todo Riesgo Completo',
    description: 'Protección total sin franquicias',
    details: [
      'Todo lo de Todo Riesgo con Franquicia',
      'Cero franquicia en todos los siniestros',
      'Auto de reemplazo por 10 días',
      'Asistencia premium en viaje',
      'Cobertura de accesorios',
      'Defensa penal'
    ],
    basePrice: 2500,
    coverageLimit: 0 // Ilimitado
  },
  { 
    value: 'premium', 
    label: 'Plan Premium',
    description: 'Protección exclusiva con beneficios adicionales',
    details: [
      'Todo lo de Todo Riesgo Completo',
      'Cobertura internacional',
      'Asistencia VIP 24/7',
      'Chofer de reemplazo',
      'Traslado y estadía en hotel',
      'Reposición por pérdida total'
    ],
    basePrice: 3500,
    coverageLimit: 0 // Ilimitado
  }
];

export const motorcycleInsurancePlans: InsurancePlan[] = [
  { 
    value: 'responsabilidad_civil_moto', 
    label: 'Responsabilidad Civil',
    description: 'Cobertura legal mínima obligatoria para motos',
    details: [
      'Daños a terceros hasta $2.000.000',
      'Gastos médicos a terceros',
      'Defensa legal básica',
      'Asistencia en viaje'
    ],
    basePrice: 400,
    coverageLimit: 2000000
  },
  { 
    value: 'todo_riesgo_moto', 
    label: 'Todo Riesgo Moto',
    description: 'Protección completa para tu motovehículo',
    details: [
      'Todo lo de Responsabilidad Civil',
      'Robo total e incendio',
      'Daños por accidente',
      'Accesorios originales',
      'Indemnización por incapacidad',
      'Asistencia mecánica'
    ],
    basePrice: 800,
    coverageLimit: 0
  },
  { 
    value: 'premium_moto', 
    label: 'Plan Premium Moto',
    description: 'Cobertura exclusiva para moteros',
    details: [
      'Todo lo de Todo Riesgo Moto',
      'Casco y indumentaria',
      'Accesorios personalizados',
      'Asistencia VIP 24/7',
      'Grúa especializada',
      'Taller preferencial'
    ],
    basePrice: 1200,
    coverageLimit: 0
  }
];

export const lifeInsurancePlans: InsurancePlan[] = [
  { 
    value: 'basico_vida', 
    label: 'Plan Básico Vida',
    description: 'Protección esencial para tu familia',
    details: [
      'Muerte por cualquier causa',
      'Capital asegurado hasta $500.000',
      'Asistencia funeraria',
      'Beneficiarios ilimitados'
    ],
    basePrice: 500,
    coverageLimit: 500000
  },
  { 
    value: 'estandar_vida', 
    label: 'Plan Estándar Vida',
    description: 'Protección balanceada con más coberturas',
    details: [
      'Todo lo del Plan Básico',
      'Muerte accidental duplicada',
      'Invalidez total y permanente',
      'Enfermedades graves',
      'Capital hasta $1.000.000'
    ],
    basePrice: 800,
    coverageLimit: 1000000
  },
  { 
    value: 'completo_vida', 
    label: 'Plan Completo Vida',
    description: 'Protección integral para tranquilidad total',
    details: [
      'Todo lo del Plan Estándar',
      'Cobertura mundial',
      'Asistencia médica internacional',
      'Repatriación',
      'Capital hasta $2.000.000'
    ],
    basePrice: 1200,
    coverageLimit: 2000000
  },
  { 
    value: 'premium_vida', 
    label: 'Plan Premium Vida',
    description: 'Protección exclusiva con máximo beneficio',
    details: [
      'Todo lo del Plan Completo',
      'Capital ilimitado',
      'Renta vitalicia para beneficiarios',
      'Cobertura de enfermedades preexistentes',
      'Asistencia legal internacional'
    ],
    basePrice: 2000,
    coverageLimit: 0 // Ilimitado
  }
];
