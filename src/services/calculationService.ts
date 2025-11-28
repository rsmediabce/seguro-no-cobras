// src/services/calculationService.ts
// Servicio para calcular cotizaciones de seguros basadas en diversos factores

import { provincesData } from '../data/provinces';
import { InsuranceQuoteData } from '../types';
import { 
  homeInsurancePlans, 
  carInsurancePlans,
  motorcycleInsurancePlans,
  lifeInsurancePlans 
} from '../data/insurancePlans';

export interface CalculationFactors {
  basePrice: number;
  ageFactor: number;
  locationFactor: number;
  propertyFactor: number;
  coverageFactor: number;
  squareMetersFactor: number;
  constructionYearFactor: number;
  hasAlarmFactor: number;
}

export interface CalculationResult {
  basePrice: number;
  finalPrice: number;
  factors: CalculationFactors;
  monthlyPrice: number;
  annualPrice: number;
}

export const calculationService = {
  // Calcular cotización para seguro de casa
  calculateHomeInsurance: (data: InsuranceQuoteData): CalculationResult => {
    const basePrice = homeInsurancePlans.find(plan => plan.value === data.coveragePlan)?.basePrice || 500;
    
    // Factor por edad
    const age = parseInt(data.age);
    const ageFactor = age < 25 ? 1.3 : age < 40 ? 1.0 : age < 60 ? 0.9 : 1.2;
    
    // Factor por ubicación (riesgo)
    const location = provincesData
      .flatMap(p => p.locations)
      .find(loc => loc.name === data.location);
    const locationFactor = location ? (location.riskIndex * 0.1) + 0.5 : 1.0;
    
    // Factor por tipo de vivienda (usando houseType)
    const propertyFactor = data.houseType === 'casa' ? 1.0 : 
                          data.houseType === 'departamento' ? 0.8 :
                          data.houseType === 'ph' ? 0.9 :
                          data.houseType === 'casa_quinta' ? 1.3 : 1.0;
    
    // Factor por plan de cobertura
    const coverageFactor = 
      data.coveragePlan === 'basico' ? 0.7 :
      data.coveragePlan === 'estandar' ? 0.9 :
      data.coveragePlan === 'full' ? 1.2 : 1.5;
    
    // Factor por metros cuadrados
    const squareMeters = parseInt(data.squareMeters || '0');
    const squareMetersFactor = squareMeters < 50 ? 0.8 :
                              squareMeters < 100 ? 1.0 :
                              squareMeters < 200 ? 1.3 : 1.6;
    
    // Factor por año de construcción
    const constructionYear = parseInt(data.constructionYear || '2000');
    const currentYear = new Date().getFullYear();
    const propertyAge = currentYear - constructionYear;
    const constructionYearFactor = propertyAge < 10 ? 0.9 :
                                  propertyAge < 20 ? 1.0 :
                                  propertyAge < 30 ? 1.2 : 1.4;
    
    // Factor por alarma
    const hasAlarmFactor = data.hasAlarm ? 0.8 : 1.0;
    
    // Cálculo final
    const factors: CalculationFactors = {
      basePrice,
      ageFactor,
      locationFactor,
      propertyFactor,
      coverageFactor,
      squareMetersFactor,
      constructionYearFactor,
      hasAlarmFactor
    };
    
    const finalPrice = basePrice * 
                      ageFactor * 
                      locationFactor * 
                      propertyFactor * 
                      coverageFactor * 
                      squareMetersFactor * 
                      constructionYearFactor * 
                      hasAlarmFactor;
    
    return {
      basePrice,
      finalPrice: Math.round(finalPrice),
      factors,
      monthlyPrice: Math.round(finalPrice),
      annualPrice: Math.round(finalPrice * 12 * 0.9) // 10% descuento por pago anual
    };
  },


  // Calcular cotización para seguro de auto
  calculateCarInsurance: (data: InsuranceQuoteData): CalculationResult => {
    const basePrice = carInsurancePlans.find(plan => plan.value === data.coveragePlan)?.basePrice || 1000;
    
    // Factor por edad del conductor principal
    const driverAge = parseInt(data.driverAge || data.age);
    const driverAgeFactor = driverAge < 25 ? 1.5 : 
                          driverAge < 30 ? 1.2 :
                          driverAge < 50 ? 1.0 : 1.3;
    
    // Factor por ubicación (riesgo)
    const location = provincesData
      .flatMap(p => p.locations)
      .find(loc => loc.name === data.location);
    const locationFactor = location ? (location.riskIndex * 0.1) + 0.5 : 1.0;
    
    // Factor por tipo de vehículo
    const vehicleTypeFactor = data.vehicleType === 'auto' ? 1.0 :
                            data.vehicleType === 'suv' ? 1.2 :
                            data.vehicleType === 'camioneta' ? 1.3 :
                            data.vehicleType === 'deportivo' ? 1.8 :
                            data.vehicleType === 'utilitario' ? 1.1 : 1.0;
    
    // Factor por antigüedad del vehículo
    const carYear = parseInt(data.carYear || '2020');
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - carYear;
    const vehicleAgeFactor = vehicleAge < 3 ? 1.2 :
                            vehicleAge < 5 ? 1.0 :
                            vehicleAge < 10 ? 0.9 : 1.1;
    
    // Factor por plan de cobertura
    const coverageFactor = 
      data.coveragePlan === 'responsabilidad_civil' ? 0.6 :
      data.coveragePlan === 'todo_riesgo_terceros' ? 1.0 :
      data.coveragePlan === 'todo_riesgo_completo' ? 1.4 : 1.8;
    
    // Factor por tipo de uso
    const useTypeFactor = data.useType === 'particular' ? 1.0 :
                        data.useType === 'profesional' ? 1.3 : 1.5;
    
    // Factor por sistema anti-robo
    const hasAntiTheftFactor = data.hasAntiTheft ? 0.9 : 1.0;

    // Cálculo final
    const factors: CalculationFactors = {
      basePrice,
      ageFactor: driverAgeFactor,
      locationFactor,
      propertyFactor: vehicleTypeFactor, // Reutilizamos propertyFactor para vehículo
      coverageFactor,
      squareMetersFactor: vehicleAgeFactor, // Reutilizamos squareMetersFactor para antigüedad
      constructionYearFactor: useTypeFactor, // Reutilizamos constructionYearFactor para uso
      hasAlarmFactor: hasAntiTheftFactor // Reutilizamos hasAlarmFactor para anti-robo
    };
    
    const finalPrice = basePrice * 
                      driverAgeFactor * 
                      locationFactor * 
                      vehicleTypeFactor * 
                      coverageFactor * 
                      vehicleAgeFactor * 
                      useTypeFactor * 
                      hasAntiTheftFactor;
    
    return {
      basePrice,
      finalPrice: Math.round(finalPrice),
      factors,
      monthlyPrice: Math.round(finalPrice),
      annualPrice: Math.round(finalPrice * 12 * 0.9) // 10% descuento por pago anual
    };
  },

  // Calcular cotización para seguro de moto
  calculateMotorcycleInsurance: (data: InsuranceQuoteData): CalculationResult => {
    const basePrice = motorcycleInsurancePlans.find(plan => plan.value === data.coveragePlan)?.basePrice || 600;
    
    // Factor por experiencia del conductor
    const driverExperience = parseInt(data.driverExperience || '1');
    const experienceFactor = driverExperience < 2 ? 1.5 : 
                            driverExperience < 5 ? 1.2 :
                            driverExperience < 10 ? 1.0 : 0.9;
    
    // Factor por ubicación (riesgo)
    const location = provincesData
      .flatMap(p => p.locations)
      .find(loc => loc.name === data.location);
    const locationFactor = location ? (location.riskIndex * 0.1) + 0.5 : 1.0;
    
    // Factor por cilindrada
    const cc = parseInt(data.motorcycleCC || '150');
    const ccFactor = cc < 150 ? 0.8 :
                    cc < 300 ? 1.0 :
                    cc < 600 ? 1.3 : 1.8;
    
    // Factor por tipo de moto
    const motorcycleTypeFactor = data.motorcycleType === 'scooter' ? 0.9 :
                                data.motorcycleType === 'calle' ? 1.0 :
                                data.motorcycleType === 'deportiva' ? 1.4 :
                                data.motorcycleType === 'custom' ? 1.2 : 1.0;
    
    // Factor por antigüedad
    const motorcycleYear = parseInt(data.motorcycleYear || '2020');
    const currentYear = new Date().getFullYear();
    const motorcycleAge = currentYear - motorcycleYear;
    const ageFactor = motorcycleAge < 3 ? 1.2 :
                    motorcycleAge < 5 ? 1.0 :
                    motorcycleAge < 10 ? 0.9 : 1.1;
    
    // Factor por plan de cobertura
    const coverageFactor = 
      data.coveragePlan === 'responsabilidad_civil_moto' ? 0.6 :
      data.coveragePlan === 'todo_riesgo_moto' ? 1.0 : 1.4;
    
    // Factor por sistema anti-robo
    const antiTheftFactor = data.hasMotorcycleAntiTheft ? 0.8 : 1.0;

    const factors: CalculationFactors = {
      basePrice,
      ageFactor: experienceFactor,
      locationFactor,
      propertyFactor: motorcycleTypeFactor,
      coverageFactor,
      squareMetersFactor: ccFactor,
      constructionYearFactor: ageFactor,
      hasAlarmFactor: antiTheftFactor
    };
    
    const finalPrice = basePrice * 
                      experienceFactor * 
                      locationFactor * 
                      motorcycleTypeFactor * 
                      coverageFactor * 
                      ccFactor * 
                      ageFactor * 
                      antiTheftFactor;
    
    return {
      basePrice,
      finalPrice: Math.round(finalPrice),
      factors,
      monthlyPrice: Math.round(finalPrice),
      annualPrice: Math.round(finalPrice * 12 * 0.9)
    };
  },

  // Calcular cotización para seguro de vida
  calculateLifeInsurance: (data: InsuranceQuoteData): CalculationResult => {
    const basePrice = lifeInsurancePlans.find(plan => plan.value === data.coveragePlan)?.basePrice || 1000;
    
    // Factor por edad
    const age = parseInt(data.age);
    const ageFactor = age < 30 ? 0.8 :
                    age < 40 ? 1.0 :
                    age < 50 ? 1.3 :
                    age < 60 ? 1.8 : 2.5;
    
    // Factor por condiciones médicas
    const medicalConditionsFactor = data.hasMedicalConditions ? 1.5 : 1.0;
    
    // Factor por fumador
    const smokerFactor = data.smoker ? 1.8 : 1.0;
    
    // Factor por número de beneficiarios
    const beneficiaries = parseInt(data.beneficiaries || '1');
    const beneficiariesFactor = beneficiaries === 1 ? 1.0 :
                              beneficiaries === 2 ? 1.1 :
                              beneficiaries === 3 ? 1.2 : 1.3;
    
    // Factor por plan de cobertura
    const coverageFactor = 
      data.coveragePlan === 'basico_vida' ? 0.7 :
      data.coveragePlan === 'estandar_vida' ? 1.0 :
      data.coveragePlan === 'completo_vida' ? 1.5 : 2.0;

    const factors: CalculationFactors = {
      basePrice,
      ageFactor,
      locationFactor: medicalConditionsFactor,
      propertyFactor: smokerFactor,
      coverageFactor,
      squareMetersFactor: beneficiariesFactor,
      constructionYearFactor: 1.0,
      hasAlarmFactor: 1.0
    };
    
    const finalPrice = basePrice * 
                      ageFactor * 
                      medicalConditionsFactor * 
                      smokerFactor * 
                      coverageFactor * 
                      beneficiariesFactor;
    
    return {
      basePrice,
      finalPrice: Math.round(finalPrice),
      factors,
      monthlyPrice: Math.round(finalPrice),
      annualPrice: Math.round(finalPrice * 12 * 0.85) // 15% descuento anual
    };
  },

  // Obtener provincias para selects
  getProvinces: () => {
    return provincesData;
  },

  // Obtener localidades por provincia
  getLocationsByProvince: (provinceId: number) => {
    const province = provincesData.find(p => p.id === provinceId);
    return province ? province.locations : [];
  },

  // Obtener índice de riesgo por localidad
  getRiskIndex: (locationName: string): number => {
    const location = provincesData
      .flatMap(p => p.locations)
      .find(loc => loc.name === locationName);
    return location ? location.riskIndex : 5;
  }
};