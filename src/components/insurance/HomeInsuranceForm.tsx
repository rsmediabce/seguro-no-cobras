// src/components/insurance/HomeInsuranceForm.tsx
// Formulario para cotizar seguro de casa utilizando Formik y validación con Yup

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import FormField from "../form/FormField";
import { homeInsuranceSchema } from "../../validation/schemas";
import { calculationService } from "../../services/calculationService";
import { storageService } from "../../services/storageService";
import {
	showSuccessAlert,
	showErrorAlert,
	showQuoteResultAlert,
} from "../../utils/alerts";
import { InsuranceQuoteData } from "../../types";
import { homeInsurancePlans } from "../../data/insurancePlans";

interface HomeInsuranceFormProps {
	onCancel: () => void;
	onShowHistory: () => void;
}

const HomeInsuranceForm: React.FC<HomeInsuranceFormProps> = ({
	onCancel,
	onShowHistory,
}) => {
	const [selectedProvince, setSelectedProvince] = useState<number | "">("");
	const [locations, setLocations] = useState<any[]>([]);

	const initialValues: InsuranceQuoteData = {
		fullName: "",
		age: "",
		email: "",
		phone: "",
		location: "",
		coveragePlan: "",
		houseType: "",
		squareMeters: "",
		hasAlarm: false,
		constructionYear: "",
	};

	const provinces = calculationService.getProvinces();

	const handleProvinceChange = (provinceId: number) => {
		setSelectedProvince(provinceId);
		const provinceLocations =
			calculationService.getLocationsByProvince(provinceId);
		setLocations(provinceLocations);
	};

	const handleSubmit = async (
		values: InsuranceQuoteData,
		{ setSubmitting }: any
	) => {
		try {
			// Calcular cotización
			const result = calculationService.calculateHomeInsurance(values);

			// Guardar en historial
			const storedQuote = storageService.saveQuote({
				type: "CASA",
				data: values,
				result,
				timestamp: new Date().toISOString(),
				totalPrice: result.monthlyPrice,
			});

			console.log("Cotización guardada con ID:", storedQuote.id);

			// Mostrar resultado
			const alertResult = await showQuoteResultAlert(
				"Casa",
				result.monthlyPrice
			);

			if (alertResult.isConfirmed) {
				await showSuccessAlert(
					"Cotización guardada",
					"Tu cotización se ha guardado en el historial."
				);
			}
		} catch (error) {
			await showErrorAlert(
				"Error",
				"No pudimos calcular tu cotización. Por favor, intenta nuevamente."
			);
		} finally {
			setSubmitting(false);
		}
	};

	const houseTypeOptions = [
		{ value: "casa", label: "Casa" },
		{ value: "departamento", label: "Departamento" },
		{ value: "ph", label: "PH" },
		{ value: "casa_quinta", label: "Casa Quinta" },
	];

	const getSelectedPlanDetails = (coveragePlan: string) => {
		const plan = homeInsurancePlans.find((p) => p.value === coveragePlan);
		if (!plan) return null;

		return (
			<>
				<h6 className="card-title text-primary">{plan.label}</h6>
				<p className="card-text small">{plan.description}</p>
				<div className="border-top pt-2">
					<h6 className="small fw-bold">Coberturas incluidas:</h6>
					<ul className="small mb-2">
						{plan.details.map((detail, index) => (
							<li key={index} className="text-muted">
								{detail}
							</li>
						))}
					</ul>
					<div className="border-top pt-2">
						<small className="text-success fw-bold">
							Precio base: ${plan.basePrice}/mes
						</small>
					</div>
				</div>
			</>
		);
	};

	return (
		<div className="home-insurance-form">
			{/* Header con botón de historial */}
			<div className="d-flex justify-content-between align-items-center mb-4">
				<div className="d-flex align-items-center">
					<button
						type="button"
						className="btn btn-outline-primary me-3"
						onClick={onShowHistory}
						title="Ver historial de cotizaciones">
						📋 Historial
					</button>
					<h2 className="mb-0">Cotizar Seguro de Casa</h2>
				</div>
				<button
					type="button"
					className="btn btn-outline-secondary"
					onClick={onCancel}>
					← Volver al Escritorio
				</button>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={homeInsuranceSchema}
				onSubmit={handleSubmit}
				validateOnChange={true}
				validateOnBlur={true}>
				{({ isSubmitting, values }) => (
					<Form>
						{/* Información Personal */}
						<div className="card mb-4">
							<div className="card-header bg-light">
								<h5 className="mb-0">Información Personal</h5>
							</div>
							<div className="card-body">
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
											min="18"
											max="80"
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
							</div>
						</div>

						{/* Información de la Propiedad */}
						<div className="card mb-4">
							<div className="card-header bg-light">
								<h5 className="mb-0">Información de la Propiedad</h5>
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-md-6">
										<FormField
											label="Tipo de vivienda"
											name="houseType"
											as="select"
											options={houseTypeOptions}
										/>
									</div>
									<div className="col-md-6">
										<FormField
											label="Metros cuadrados"
											name="squareMeters"
											type="number"
											placeholder="80"
											min="20"
											max="1000"
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6">
										<FormField
											label="Año de construcción"
											name="constructionYear"
											type="number"
											placeholder="2010"
											min="1900"
											max={new Date().getFullYear()}
										/>
									</div>
									<div className="col-md-6">
										<div className="mb-3">
											<label className="form-label">
												¿Tiene sistema de alarma?
											</label>
											<div className="form-check">
												<Field
													type="radio"
													name="hasAlarm"
													value="true"
													className="form-check-input"
													id="hasAlarmYes"
												/>
												<label
													className="form-check-label"
													htmlFor="hasAlarmYes">
													Sí
												</label>
											</div>
											<div className="form-check">
												<Field
													type="radio"
													name="hasAlarm"
													value="false"
													className="form-check-input"
													id="hasAlarmNo"
												/>
												<label
													className="form-check-label"
													htmlFor="hasAlarmNo">
													No
												</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Ubicación y Cobertura */}
						<div className="card mb-4">
							<div className="card-header bg-light">
								<h5 className="mb-0">Ubicación y Cobertura</h5>
							</div>
							<div className="card-body">
								<div className="row">
									{/* Columna 1 - Ubicación (7 columnas) */}
									<div className="col-md-7">
										<div className="row">
											{/* Provincia */}
											<div className="col-md-6">
												<div className="mb-3">
													<label htmlFor="province" className="form-label">
														Provincia
													</label>
													<select
														id="province"
														className="form-select"
														value={selectedProvince}
														onChange={(e) =>
															handleProvinceChange(Number(e.target.value))
														}>
														<option value="">Seleccionar provincia...</option>
														{provinces.map((province) => (
															<option key={province.id} value={province.id}>
																{province.name}
															</option>
														))}
													</select>
												</div>
											</div>

											{/* Localidad */}
											<div className="col-md-6">
												<FormField
													label="Localidad"
													name="location"
													id="location"
													as="select"
													options={locations.map((loc) => ({
														value: loc.name,
														label: `${loc.name} (Riesgo: ${loc.riskIndex}/10)`,
													}))}
													disabled={!selectedProvince}
												/>
											</div>
										</div>

										{/* Selector de Planes */}
										<div className="row mt-3">
											<div className="col-md-12">
												<div className="mb-3">
													<label className="form-label">
														Selecciona tu Plan de Cobertura
													</label>
													<div className="row">
														{homeInsurancePlans.map((plan) => (
															<div key={plan.value} className="col-md-6 mb-2">
																<div
																	className="card plan-card h-100 border-2"
																	style={{
																		cursor: "pointer",
																		borderColor:
																			values.coveragePlan === plan.value
																				? "#007bff"
																				: "#dee2e6",
																		backgroundColor:
																			values.coveragePlan === plan.value
																				? "#f8f9fa"
																				: "white",
																	}}>
																	<div className="card-body p-3 text-center">
																		<div className="form-check mb-2">
																			<Field
																				type="radio"
																				name="coveragePlan"
																				value={plan.value}
																				className="form-check-input"
																				id={`plan-${plan.value}`}
																			/>
																			<label
																				className="form-check-label fw-bold"
																				htmlFor={`plan-${plan.value}`}>
																				{plan.label}
																			</label>
																		</div>
																		<p className="small text-muted mb-2">
																			{plan.description}
																		</p>
																		<span className="badge bg-success">
																			${plan.basePrice}/mes
																		</span>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
										</div>
									</div>

									{/* Columna 2 - Detalle del Plan (5 columnas) */}
									<div className="col-md-5">
										<div className="mb-3">
											<label className="form-label">
												Detalle del Plan Seleccionado
											</label>
											<div className="card bg-light h-100">
												<div className="card-body">
													{values.coveragePlan ? (
														getSelectedPlanDetails(values.coveragePlan)
													) : (
														<div className="text-center py-4">
															<span style={{ fontSize: "3rem" }}>📋</span>
															<p className="text-muted mt-2 mb-0">
																Selecciona un plan para ver los detalles de
																cobertura
															</p>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Botones de acción */}
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

export default HomeInsuranceForm;
