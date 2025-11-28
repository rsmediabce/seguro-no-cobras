// src/types/index.ts
// Definición de tipos y interfaces para la aplicación de seguros

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface InsuranceQuoteData {
  fullName: string;
  age: string;
  location: string;
  coveragePlan: string;
  // Campos específicos por tipo de seguro
  vehicleType?: string;
  carModel?: string;
  year?: string;
  licensePlate?: string;
  houseType?: string;
  squareMeters?: string;
  hasAlarm?: boolean;
  motorcycleCC?: string;
  lifeCoverageType?: string;
  beneficiaries?: string;
}

export interface CoverageOption {
  id: number;
  name: string;
  description: string;
  price: number;
  coverage: string[];
}

export interface QuoteResult {
  basePrice: number;
  finalPrice: number;
  coverageOptions: CoverageOption[];
  factors: {
    ageFactor: number;
    propertyFactor: number;
    locationFactor: number;
    coverageFactor: number;
  };
}

export interface InsuranceQuoteData {
  fullName: string;
  age: string;
  location: string;
  coveragePlan: string;
  email: string;
  phone: string;
  
  // Campos específicos para Seguro de CASA
  houseType?: string;
  squareMeters?: string;
  hasAlarm?: boolean;
  constructionYear?: string;
  
  // Campos específicos para Seguro de AUTO
  vehicleType?: string;
  carModel?: string;
  carYear?: string;
  licensePlate?: string;
  hasAntiTheft?: boolean;
  driverAge?: string;
  useType?: string; // particular/profesional
  
 // Campos específicos para Seguro de MOTO
  motorcycleType?: string;
  motorcycleCC?: string;
  motorcycleYear?: string;
  motorcycleLicensePlate?: string;
  hasMotorcycleAntiTheft?: boolean;
  driverExperience?: string;
  
  // Campos específicos para Seguro de VIDA
  beneficiaries?: string;
  hasMedicalConditions?: boolean;
  smoker?: boolean;
  occupation?: string;
}