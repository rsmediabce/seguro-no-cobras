// src/components/history/QuoteHistory.tsx
// Componente para mostrar el historial de cotizaciones guardadas

import React, { useState } from "react";
import { StoredQuote } from "../../services/storageService";
import { storageService } from "../../services/storageService";
import {
	showConfirmAlert,
	showSuccessAlert,
	showErrorAlert,
} from "../../utils/alerts";
import {
	homeInsurancePlans,
	carInsurancePlans,
	motorcycleInsurancePlans,
	lifeInsurancePlans,
} from "../../data/insurancePlans";

interface QuoteHistoryProps {
	quotes: StoredQuote[];
	onClose: () => void;
	onQuotesUpdate: () => void;
	insuranceType?: string;
}

const getPlanLabel = (planValue: string) => {
	// Buscar en todos los tipos de planes
	const allPlans = [
		...homeInsurancePlans,
		...carInsurancePlans,
		...motorcycleInsurancePlans,
		...lifeInsurancePlans,
	];
	const plan = allPlans.find((p) => p.value === planValue);
	return plan ? plan.label : planValue;
};

const QuoteHistory: React.FC<QuoteHistoryProps> = ({
	quotes,
	onClose,
	onQuotesUpdate,
	insuranceType,
}) => {
	const [selectedQuote, setSelectedQuote] = useState<StoredQuote | null>(null);
	const [viewMode, setViewMode] = useState<"list" | "detail">("list");

	const handleDeleteQuote = async (quoteId: string) => {
		const result = await showConfirmAlert(
			"Eliminar cotización",
			"¿Estás seguro de que deseas eliminar esta cotización?"
		);

		if (result.isConfirmed) {
			const deleted = storageService.deleteQuote(quoteId);
			if (deleted) {
				await showSuccessAlert(
					"Eliminada",
					"Cotización eliminada correctamente"
				);
				onQuotesUpdate();
			} else {
				await showErrorAlert("Error", "No se pudo eliminar la cotización");
			}
		}
	};

	const handleDeleteAll = async () => {
		const message = insuranceType
			? `¿Estás seguro de que deseas eliminar TODAS las cotizaciones de ${insuranceType}?`
			: "¿Estás seguro de que deseas eliminar TODAS las cotizaciones?";

		const result = await showConfirmAlert("Eliminar todo", message);

		if (result.isConfirmed) {
			if (insuranceType) {
				const deletedCount = storageService.deleteQuotesByType(insuranceType);
				await showSuccessAlert(
					"Eliminadas",
					`${deletedCount} cotizaciones eliminadas`
				);
			} else {
				storageService.deleteAllQuotes();
				await showSuccessAlert(
					"Eliminadas",
					"Todas las cotizaciones han sido eliminadas"
				);
			}
			onQuotesUpdate();
		}
	};

	const handleViewDetails = (quote: StoredQuote) => {
		setSelectedQuote(quote);
		setViewMode("detail");
	};

	const formatDate = (timestamp: string) => {
		return new Date(timestamp).toLocaleDateString("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
		}).format(price);
	};

	if (viewMode === "detail" && selectedQuote) {
		const renderQuoteDetails = () => {
			switch (selectedQuote.type) {
				case "CASA":
					return (
						<>
							<div className="row">
								<div className="col-md-6">
									<h6>Información Personal</h6>
									<p>
										<strong>Nombre:</strong> {selectedQuote.data.fullName}
									</p>
									<p>
										<strong>Edad:</strong> {selectedQuote.data.age} años
									</p>
									<p>
										<strong>Email:</strong> {selectedQuote.data.email}
									</p>
									<p>
										<strong>Teléfono:</strong> {selectedQuote.data.phone}
									</p>
								</div>
								<div className="col-md-6">
									<h6>Información de la Propiedad</h6>
									<p>
										<strong>Tipo de vivienda:</strong>{" "}
										{selectedQuote.data.houseType}
									</p>
									<p>
										<strong>Metros cuadrados:</strong>{" "}
										{selectedQuote.data.squareMeters} m²
									</p>
									<p>
										<strong>Año construcción:</strong>{" "}
										{selectedQuote.data.constructionYear}
									</p>
									<p>
										<strong>Alarma:</strong>{" "}
										{selectedQuote.data.hasAlarm ? "Sí" : "No"}
									</p>
								</div>
							</div>
						</>
					);

				case "AUTO":
					return (
						<>
							<div className="row">
								<div className="col-md-6">
									<h6>Información Personal</h6>
									<p>
										<strong>Nombre:</strong> {selectedQuote.data.fullName}
									</p>
									<p>
										<strong>Edad:</strong> {selectedQuote.data.age} años
									</p>
									<p>
										<strong>Email:</strong> {selectedQuote.data.email}
									</p>
									<p>
										<strong>Teléfono:</strong> {selectedQuote.data.phone}
									</p>
								</div>
								<div className="col-md-6">
									<h6>Información del Vehículo</h6>
									<p>
										<strong>Tipo de vehículo:</strong>{" "}
										{selectedQuote.data.vehicleType}
									</p>
									<p>
										<strong>Modelo:</strong> {selectedQuote.data.carModel}
									</p>
									<p>
										<strong>Año:</strong> {selectedQuote.data.carYear}
									</p>
									<p>
										<strong>Patente:</strong> {selectedQuote.data.licensePlate}
									</p>
									<p>
										<strong>Uso:</strong> {selectedQuote.data.useType}
									</p>
									<p>
										<strong>Edad conductor:</strong>{" "}
										{selectedQuote.data.driverAge} años
									</p>
									<p>
										<strong>Anti-robo:</strong>{" "}
										{selectedQuote.data.hasAntiTheft ? "Sí" : "No"}
									</p>
								</div>
							</div>
						</>
					);
				case "MOTO":
					return (
						<>
							<div className="row">
								<div className="col-md-6">
									<h6>Información Personal</h6>
									<p>
										<strong>Nombre:</strong> {selectedQuote.data.fullName}
									</p>
									<p>
										<strong>Edad:</strong> {selectedQuote.data.age} años
									</p>
									<p>
										<strong>Email:</strong> {selectedQuote.data.email}
									</p>
									<p>
										<strong>Teléfono:</strong> {selectedQuote.data.phone}
									</p>
								</div>
								<div className="col-md-6">
									<h6>Información de la Motocicleta</h6>
									<p>
										<strong>Tipo:</strong> {selectedQuote.data.motorcycleType}
									</p>
									<p>
										<strong>Cilindrada:</strong>{" "}
										{selectedQuote.data.motorcycleCC} cc
									</p>
									<p>
										<strong>Año:</strong> {selectedQuote.data.motorcycleYear}
									</p>
									<p>
										<strong>Patente:</strong>{" "}
										{selectedQuote.data.motorcycleLicensePlate}
									</p>
									<p>
										<strong>Experiencia:</strong>{" "}
										{selectedQuote.data.driverExperience} años
									</p>
									<p>
										<strong>Anti-robo:</strong>{" "}
										{selectedQuote.data.hasMotorcycleAntiTheft ? "Sí" : "No"}
									</p>
								</div>
							</div>
						</>
					);

				case "VIDA":
					return (
						<>
							<div className="row">
								<div className="col-md-6">
									<h6>Información Personal</h6>
									<p>
										<strong>Nombre:</strong> {selectedQuote.data.fullName}
									</p>
									<p>
										<strong>Edad:</strong> {selectedQuote.data.age} años
									</p>
									<p>
										<strong>Email:</strong> {selectedQuote.data.email}
									</p>
									<p>
										<strong>Teléfono:</strong> {selectedQuote.data.phone}
									</p>
									<p>
										<strong>Ocupación:</strong> {selectedQuote.data.occupation}
									</p>
								</div>
								<div className="col-md-6">
									<h6>Información de Salud</h6>
									<p>
										<strong>Beneficiarios:</strong>{" "}
										{selectedQuote.data.beneficiaries}
									</p>
									<p>
										<strong>Condiciones médicas:</strong>{" "}
										{selectedQuote.data.hasMedicalConditions ? "Sí" : "No"}
									</p>
									<p>
										<strong>Fumador:</strong>{" "}
										{selectedQuote.data.smoker ? "Sí" : "No"}
									</p>
								</div>
							</div>
						</>
					);

				default:
					return (
						<>
							<div className="row">
								<div className="col-md-6">
									<h6>Información Personal</h6>
									<p>
										<strong>Nombre:</strong> {selectedQuote.data.fullName}
									</p>
									<p>
										<strong>Edad:</strong> {selectedQuote.data.age} años
									</p>
									<p>
										<strong>Email:</strong> {selectedQuote.data.email}
									</p>
									<p>
										<strong>Teléfono:</strong> {selectedQuote.data.phone}
									</p>
								</div>
								<div className="col-md-6">
									<h6>Información General</h6>
									<p>
										<strong>Ubicación:</strong> {selectedQuote.data.location}
									</p>
									<p>
										<strong>Plan:</strong>{" "}
										{getPlanLabel(selectedQuote.data.coveragePlan)}
									</p>
								</div>
							</div>
						</>
					);
			}
		};

		const renderFactors = () => {
			if (!selectedQuote.result.factors) return null;

			const factors = selectedQuote.result.factors;

			return (
				<div className="mt-3">
					<h6>Factores Aplicados</h6>
					<div className="row">
						{selectedQuote.type === "CASA" ? (
							<>
								<div className="col-md-3">
									<small>Edad: x{factors.ageFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Ubicación: x{factors.locationFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Metros: x{factors.squareMetersFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Alarma: x{factors.hasAlarmFactor}</small>
								</div>
							</>
						) : selectedQuote.type === "AUTO" ? (
							<>
								<div className="col-md-3">
									<small>Edad conductor: x{factors.ageFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Ubicación: x{factors.locationFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Tipo vehículo: x{factors.propertyFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Antigüedad: x{factors.squareMetersFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Uso: x{factors.constructionYearFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Anti-robo: x{factors.hasAlarmFactor}</small>
								</div>
							</>
						) : selectedQuote.type === "MOTO" ? (
							<>
								<div className="col-md-3">
									<small>Experiencia: x{factors.ageFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Ubicación: x{factors.locationFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Tipo moto: x{factors.propertyFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Cilindrada: x{factors.squareMetersFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Antigüedad: x{factors.constructionYearFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Anti-robo: x{factors.hasAlarmFactor}</small>
								</div>
							</>
						) : selectedQuote.type === "VIDA" ? (
							<>
								<div className="col-md-3">
									<small>Edad: x{factors.ageFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Cond. médicas: x{factors.locationFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Fumador: x{factors.propertyFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Beneficiarios: x{factors.squareMetersFactor}</small>
								</div>
							</>
						) : (
							<>
								<div className="col-md-3">
									<small>Edad: x{factors.ageFactor}</small>
								</div>
								<div className="col-md-3">
									<small>Ubicación: x{factors.locationFactor}</small>
								</div>
							</>
						)}
					</div>
				</div>
			);
		};
		return (
			<div className="quote-detail">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h4>
						{" "}
						Detalles de Cotización -{" "}
						<span
							className={`badge ${
								selectedQuote.type === "CASA"
									? "bg-primary"
									: selectedQuote.type === "AUTO"
									? "bg-success"
									: selectedQuote.type === "MOTO"
									? "bg-warning text-dark"
									: selectedQuote.type === "VIDA"
									? "bg-danger"
									: "bg-secondary"
							}`}
							style={{ fontSize: "1rem" }}>
							{selectedQuote.type}
						</span>
					</h4>
					<button
						className="btn btn-outline-secondary"
						onClick={() => setViewMode("list")}>
						← Volver al listado
					</button>
				</div>

				<div className="card">
					<div className="card-header">
						<h5 className="mb-0">
							{selectedQuote.type} - {formatDate(selectedQuote.timestamp)}
						</h5>
					</div>
					<div className="card-body">
						{renderQuoteDetails()}

						<div className="row mt-3">
							<div className="col-md-6">
								<h6>Ubicación y Cobertura</h6>
								<p>
									<strong>Ubicación:</strong> {selectedQuote.data.location}
								</p>
								<p>
									<strong>Plan:</strong>{" "}
									{getPlanLabel(selectedQuote.data.coveragePlan)}
								</p>
							</div>
							<div className="col-md-6">
								<h6>Resultado de Cotización</h6>
								<p>
									<strong>Precio mensual:</strong>{" "}
									{formatPrice(selectedQuote.result.monthlyPrice)}
								</p>
								<p>
									<strong>Precio anual:</strong>{" "}
									{formatPrice(selectedQuote.result.annualPrice)}
								</p>
								<p>
									<strong>Ahorro anual:</strong>{" "}
									{formatPrice(
										selectedQuote.result.monthlyPrice * 12 -
											selectedQuote.result.annualPrice
									)}
								</p>
							</div>
						</div>

						{renderFactors()}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="quote-history">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h4>
					Historial de Cotizaciones
					{insuranceType && (
						<span
							className={`badge ${
								insuranceType === "CASA"
									? "bg-primary"
									: insuranceType === "AUTO"
									? "bg-success"
									: insuranceType === "MOTO"
									? "bg-warning text-dark"
									: insuranceType === "VIDA"
									? "bg-danger"
									: "bg-secondary"
							}`}
							style={{ fontSize: "1rem", marginLeft: "8px" }}>
							{insuranceType}
						</span>
					)}
				</h4>
				<div>
					{quotes.length > 0 && (
						<button
							className="btn btn-outline-danger btn-sm me-2"
							onClick={handleDeleteAll}>
							🗑️ Eliminar Todo
						</button>
					)}
					<button
						className="btn btn-outline-secondary btn-sm"
						onClick={onClose}>
						Cerrar
					</button>
				</div>
			</div>

			{quotes.length === 0 ? (
				<div className="text-center py-5">
					<div className="mb-3">
						<span style={{ fontSize: "3rem" }}>📋</span>
					</div>
					<h5>No hay cotizaciones</h5>
					<p className="text-muted">
						{insuranceType
							? `Aún no has realizado cotizaciones de ${insuranceType}`
							: "Aún no has realizado ninguna cotización"}
					</p>
				</div>
			) : (
				<div className="table-responsive">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Nombre</th>
								<th>Tipo</th>
								<th>Ubicación</th>
								<th>Precio Mensual</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
							{quotes.map((quote) => (
								<tr key={quote.id}>
									<td>{formatDate(quote.timestamp)}</td>
									<td>{quote.data.fullName}</td>
									<td>
										<span
											className={`badge ${
												quote.type === "CASA"
													? "bg-primary"
													: quote.type === "AUTO"
													? "bg-success"
													: quote.type === "MOTO"
													? "bg-warning text-dark"
													: quote.type === "VIDA"
													? "bg-danger"
													: "bg-secondary"
											}`}>
											{quote.type}
										</span>
									</td>{" "}
									<td>{quote.data.location}</td>
									<td className="fw-bold text-success">
										{formatPrice(quote.totalPrice)}
									</td>
									<td>
										<button
											className="btn btn-sm btn-outline-primary me-1"
											onClick={() => handleViewDetails(quote)}
											title="Ver detalles">
											👁️
										</button>
										<button
											className="btn btn-sm btn-outline-danger"
											onClick={() => handleDeleteQuote(quote.id)}
											title="Eliminar">
											🗑️
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default QuoteHistory;
