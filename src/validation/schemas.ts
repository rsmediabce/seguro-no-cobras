// src/validation/schemas.ts
// Esquemas de validación para formularios utilizando Yup

import * as yup from 'yup';

// Esquema base común a todos los seguros
const baseInsuranceSchema = {
  fullName: yup
    .string()
    .required('El nombre completo es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .matches(/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras'),
  age: yup
    .number()
    .typeError('La edad debe ser un número')
    .required('La edad es requerida')
    .min(18, 'Debes ser mayor de 18 años')
    .max(80, 'La edad máxima es 80 años'),
  email: yup
    .string()
    .email('Ingresa un email válido')
    .required('El email es requerido'),
  phone: yup
    .string()
    .required('El teléfono es requerido')
    .matches(/^[0-9]+$/, 'El teléfono solo puede contener números')
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
};

// Esquemas específicos por tipo de seguro
export const loginSchema = yup.object({
  email: yup.string().email('Ingresa un email válido').required('El email es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida')
});

export const homeInsuranceSchema = yup.object({
  ...baseInsuranceSchema,
  location: yup.string().required('Selecciona una ubicación'),
  //coverageAmount: yup.string().required('Selecciona un monto de cobertura'),
  coveragePlan: yup.string().required('Selecciona un plan de cobertura'),
  houseType: yup.string().required('Selecciona el tipo de vivienda'),
  squareMeters: yup
    .number()
    .typeError('Los metros cuadrados deben ser un número')
    .required('Los metros cuadrados son requeridos')
    .min(20, 'Mínimo 20 m²')
    .max(1000, 'Máximo 1000 m²'),
  hasAlarm: yup.boolean(),
  constructionYear: yup  // ← AGREGAR ESTE CAMPO
    .number()
    .typeError('El año debe ser un número')
    .required('El año de construcción es requerido')
    .min(1900, 'El año debe ser posterior a 1900')
    .max(new Date().getFullYear(), 'El año no puede ser futuro')
});

export const carInsuranceSchema = yup.object({
  ...baseInsuranceSchema,
  vehicleType: yup.string().required('Selecciona el tipo de vehículo'),
  carModel: yup.string().required('El modelo del vehículo es requerido'),
  carYear: yup
    .number()
    .typeError('El año debe ser un número')
    .required('El año es requerido')
    .min(1990, 'El año debe ser posterior a 1990')
    .max(new Date().getFullYear() + 1, 'El año no puede ser mayor al actual + 1'),
  licensePlate: yup
    .string()
    .required('La patente es requerida')
    .matches(/^[A-Za-z0-9]{6,8}$/, 'Formato de patente inválido'),
  hasAntiTheft: yup.boolean(),
  driverAge: yup
    .number()
    .typeError('La edad del conductor debe ser un número')
    .required('La edad del conductor es requerida')
    .min(18, 'El conductor debe ser mayor de 18 años'),
  useType: yup.string().required('Selecciona el tipo de uso')
});

// Esquema para las cotizaciones de motos
export const motorcycleInsuranceSchema = yup.object({
  ...baseInsuranceSchema,
  motorcycleType: yup.string().required('Selecciona el tipo de motocicleta'),
  motorcycleCC: yup.string().required('Selecciona la cilindrada'),
  motorcycleYear: yup
    .number()
    .typeError('El año debe ser un número')
    .required('El año es requerido')
    .min(1990, 'El año debe ser posterior a 1990')
    .max(new Date().getFullYear()),
  motorcycleLicensePlate: yup
    .string()
    .required('La patente es requerida')
    .matches(/^[A-Za-z0-9]{6,8}$/, 'Formato de patente inválido'),
  hasMotorcycleAntiTheft: yup.boolean(),
  driverExperience: yup
    .number()
    .typeError('Los años de experiencia deben ser un número')
    .required('Los años de experiencia son requeridos')
    .min(0, 'Mínimo 0 años')
    .max(60, 'Máximo 60 años')
});

export const lifeInsuranceSchema = yup.object({
  ...baseInsuranceSchema,
  beneficiaries: yup
    .number()
    .typeError('El número de beneficiarios debe ser un número')
    .required('El número de beneficiarios es requerido')
    .min(1, 'Mínimo 1 beneficiario')
    .max(10, 'Máximo 10 beneficiarios'),
  hasMedicalConditions: yup.boolean(),
  smoker: yup.boolean(),
  occupation: yup.string().required('La ocupación es requerida')
});

