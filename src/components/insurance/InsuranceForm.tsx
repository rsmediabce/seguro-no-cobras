// src/components/insurance/InsuranceForm.tsx
// Formulario genérico para cotizar seguros utilizando Formik y validación con Yup

import React from "react";
import { Formik, Form } from "formik";
import FormField from "../form/FormField";
import { showSuccessAlert, showErrorAlert } from "../../utils/alerts";

interface InsuranceFormProps {
	insuranceType: string;
	validationSchema: any;
	initialValues: any;
	onCancel: () => void;
	onQuoteCalculated: (result: any) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({
	insuranceType,
	validationSchema,
	initialValues,
	onCancel,
	onQuoteCalculated,
}) => {
	const calculateQuote = async (values: any) => {
		// Simulación de cálculo de cotización
		const basePrice = 100;
		const factors = {
			age: parseInt(values.age) > 50 ? 1.2 : 1.0,
			coverage: values.coverageAmount === "1000000" ? 1.5 : 1.0,
		};

		const finalPrice = basePrice * factors.age * factors.coverage;

		return {
			basePrice,
			finalPrice,
			factors,
			coverageOptions: [
				{
					id: 1,
					name: "Cobertura Básica",
					description: "Protección esencial",
					price: finalPrice * 0.8,
					coverage: ["Daños materiales", "Responsabilidad civil"],
				},
				{
					id: 2,
					name: "Cobertura Completa",
					description: "Protección total",
					price: finalPrice,
					coverage: ["Todo riesgo", "Asistencia en viaje", "Robo total"],
				},
			],
		};
	};

	const handleSubmit = async (values: any, { setSubmitting }: any) => {
		try {
			const result = await calculateQuote(values);
			await showSuccessAlert(
				"Cotización calculada",
				`Hemos calculado tu seguro de ${insuranceType}`
			);
			onQuoteCalculated(result);
		} catch (error) {
			await showErrorAlert("Error", "No pudimos calcular tu cotización");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="insurance-form">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h2>Cotizar {insuranceType}</h2>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={onCancel}>
					← Volver
				</button>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
				{({ isSubmitting }) => (
					<Form>
						<div className="row">
							<div className="col-md-6">
								<FormField
									label="Nombre completo"
									name="fullName"
									type="text"
									placeholder="Juan Pérez"
								/>
							</div>
							<div className="col-md-6">
								<FormField
									label="Email"
									name="email"
									type="email"
									placeholder="juan@ejemplo.com"
								/>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6">
								<FormField
									label="Edad"
									name="age"
									type="number"
									placeholder="30"
								/>
							</div>
							<div className="col-md-6">
								<FormField
									label="Teléfono"
									name="phone"
									type="tel"
									placeholder="1122334455"
								/>
							</div>
						</div>

						<div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
							<button
								type="button"
								className="btn btn-secondary me-md-2"
								onClick={onCancel}>
								Cancelar
							</button>
							<button
								type="submit"
								className="btn btn-primary"
								disabled={isSubmitting}>
								{isSubmitting ? "Calculando..." : "Calcular Cotización"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default InsuranceForm;
