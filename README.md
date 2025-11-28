# 🛡️ SeguroNoCobras - Portal de Seguros

Un sistema completo de cotización de seguros desarrollado en React + TypeScript que permite a los usuarios simular y gestionar cotizaciones para 4 tipos diferentes de seguros.

## ✨ Características Principales

### 🏠 **Seguro de Casa**
- Cálculos basados en: edad, ubicación, tipo de propiedad, metros cuadrados, año construcción, sistema de alarma
- 4 planes de cobertura: Básico, Estándar, Full, VIP

### 🚗 **Seguro de Auto**  
- Factores considerados: tipo de vehículo, modelo, año, uso, edad del conductor, sistema anti-robo
- Planes: Responsabilidad Civil, Todo Riesgo con Franquicia, Todo Riesgo Completo, Premium

### 🏍️ **Seguro de Moto**
- Variables: tipo de moto, cilindrada, experiencia del conductor, sistema de seguridad
- Coberturas específicas para motociclistas

### ❤️ **Seguro de Vida**
- Cálculos por: edad, ocupación, condiciones médicas, hábitos (fumador), número de beneficiarios
- Planes progresivos con diferentes niveles de cobertura

## 🚀 Tecnologías Utilizadas

- **Frontend:** React 18 + TypeScript + Vite
- **Estilos:** Bootstrap 5 + CSS personalizado
- **Formularios:** Formik + Yup (validaciones)
- **Alertas:** SweetAlert2
- **Estado:** useState/useEffect + localStorage
- **Build Tool:** Vite

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación

# Clonar el repositorio
git clone [url-del-repositorio]
cd seguro-no-cobras

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

## Usuarios de Prueba
Email: usuario@ejemplo.com / Contraseña: password123
Email: admin@seguros.com / Contraseña: admin123  
Email: test@test.com / Contraseña: test123

## 🏗️ Estructura del Proyecto
src/
├── components/
│   ├── form/           # Componentes de formulario reutilizables
│   ├── history/        # Formulario del Historial General de Cotizaciones y por tipo de seguro
│   ├── insurance/      # Formularios específicos por tipo de seguro
│   └── shared/         # Componentes compartidos
├── data/
│   ├── insurancePlans.ts    # Planes de cobertura
│   ├── provinces.ts         # Datos de ubicaciones
│   └── users.ts             # Usuarios demo
├── services/
│   ├── calculationService.ts # Lógica de cálculos
│   ├── storageService.ts     # Gestión localStorage
│   └── userService.ts        # Autenticación
├── types/              # Definiciones TypeScript
├── utils/
│   └── alerts.ts       # Utilidades de alertas
└── validation/
    └── schemas.ts      # Esquemas de validación Yup


## 🔧 Funcionalidades Implementadas

* Sistema de autenticación con usuarios demo

* 4 tipos de seguros con formularios específicos

* Cálculos realistas basados en múltiples factores de riesgo

* Historial inteligente con CRUD completo

* Validaciones en tiempo real con Formik + Yup

* Interfaz responsive con Bootstrap 5

* Persistencia en localStorage

* Alertas profesionales con SweetAlert2

* Error Boundary para manejo de errores

## 📊 Características del Historial

* Visualización por tipo de seguro
* Detalles específicos según el tipo de cotización
* Factores aplicados en cada cálculo
* Funcionalidad completa CRUD (Crear, Leer, Actualizar, Eliminar)
* Eliminación individual y masiva

## 🎯 Cálculos y Factores
Factores Comunes
Edad: Ajustes por grupo etario

Ubicación: Índice de riesgo por localidad (1-10)

Plan seleccionado: Precio base según cobertura

Factores Específicos
Casa: Metros², año construcción, alarma, tipo de vivienda

Auto: Tipo vehículo, antigüedad, uso, edad conductor, anti-robo

Moto: Cilindrada, experiencia, tipo de moto, seguridad

Vida: Ocupación, condiciones médicas, hábitos, beneficiarios

## 🚀 Despliegue

GitHub Pages
# Instalar gh-pages
npm install --save-dev gh-pages

# Agregar scripts al package.json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Desplegar
npm run deploy

## 🛠️ Desarrollo
Agregar Nuevo Tipo de Seguro
Crear formulario en components/insurance/
Definir esquema de validación en validation/schemas.ts
Agregar planes en data/insurancePlans.ts
Implementar cálculos en services/calculationService.ts
Integrar en App.tsx y Dashboard.tsx

## Estructura de Datos
interface InsuranceQuoteData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  location: string;
  coveragePlan: string;
  // Campos específicos por tipo de seguro...
}

interface StoredQuote {
  id: string;
  type: string;
  data: InsuranceQuoteData;
  result: CalculationResult;
  timestamp: string;
  totalPrice: number;
}

## 📄 Licencia
Este trabajo fue desarrollado como Proyecto final React de la  Carrera Front End de la UNTreF


## 👥 Autores
Rogelio SCHWINDT
rsmediabce@gmail.com
Balcarce - Buenos Aires
ARGENTINA Diciembre 2025