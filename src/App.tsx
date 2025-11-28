/* src/App.tsx */
/* Componente principal de la aplicación Seguro No Cobras */

import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HomeInsuranceForm from "./components/insurance/HomeInsuranceForm";
import CarInsuranceForm from "./components/insurance/CarInsuranceForm";
import MotorcycleInsuranceForm from "./components/insurance/MotorcycleInsuranceForm";
import LifeInsuranceForm from "./components/insurance/LifeInsuranceForm";
import QuoteHistory from "./components/history/QuoteHistory";
import { storageService, StoredQuote } from "./services/storageService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {
	const [user, setUser] = useState<any>(null);
	const [currentView, setCurrentView] = useState<
		| "dashboard"
		| "homeInsurance"
		| "carInsurance"
		| "motorcycleInsurance"
		| "lifeInsurance"
		| "history"
	>("dashboard");
	const [historyQuotes, setHistoryQuotes] = useState<StoredQuote[]>([]);
	const [historyType, setHistoryType] = useState<string>("");

	// Cargar cotizaciones cuando cambie la vista de historial
	useEffect(() => {
		if (currentView === "history") {
			if (historyType) {
				// Historial específico por tipo
				setHistoryQuotes(storageService.getQuotesByType(historyType));
			} else {
				// Historial completo
				setHistoryQuotes(storageService.getAllQuotes());
			}
		}
	}, [currentView, historyType]);

	const handleLogin = (userData: any) => {
		setUser(userData);
		setCurrentView("dashboard");
	};

	const handleLogout = () => {
		setUser(null);
		setCurrentView("dashboard");
		setHistoryQuotes([]);
		setHistoryType("");
	};

	const handleSelectInsurance = (insuranceType: string) => {
		switch (insuranceType) {
			case "CASA":
				setCurrentView("homeInsurance");
				break;
			case "Automóvil":
				setCurrentView("carInsurance");
				break;
			case "Motovehículos":
				setCurrentView("motorcycleInsurance");
				break;
			case "Seguro de Vida":
				setCurrentView("lifeInsurance");
				break;
			default:
				setCurrentView("dashboard");
		}
	};

	const handleShowHistory = (type?: string) => {
		setHistoryType(type || "");
		setCurrentView("history");
	};

	const handleQuotesUpdate = () => {
		// Recargar las cotizaciones
		if (historyType) {
			setHistoryQuotes(storageService.getQuotesByType(historyType));
		} else {
			setHistoryQuotes(storageService.getAllQuotes());
		}
	};

	const handleBackToDashboard = () => {
		setCurrentView("dashboard");
		setHistoryType("");
	};

	// Si no hay usuario, mostrar login
	if (!user) {
		return <Login onLogin={handleLogin} />;
	}

	// Renderizar la vista actual
	const renderCurrentView = () => {
		switch (currentView) {
			case "homeInsurance":
				return (
					<div className="min-vh-100 bg-light">
						<nav className="navbar navbar-dark bg-primary shadow-sm">
							<div className="container">
								<span className="navbar-brand mb-0 h1 fw-bold">
									SeguroNoCobras
								</span>
								<div className="d-flex align-items-center">
									<span className="text-white me-3">Hola, {user.name}</span>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory("CASA")}
										title="Ver historial de casas">
										📋 Historial Casa
									</button>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory()}
										title="Ver todo el historial">
										📋 Historial General
									</button>
									<button
										className="btn btn-outline-light btn-sm"
										onClick={handleLogout}>
										Cerrar Sesión
									</button>
								</div>
							</div>
						</nav>

						<div className="container py-4">
							<HomeInsuranceForm
								onCancel={handleBackToDashboard}
								onShowHistory={() => handleShowHistory("CASA")}
							/>
						</div>
					</div>
				);
			case "carInsurance":
				return (
					<div className="min-vh-100 bg-light">
						<nav className="navbar navbar-dark bg-primary shadow-sm">
							<div className="container">
								<span className="navbar-brand mb-0 h1 fw-bold">
									SeguroNoCobras
								</span>
								<div className="d-flex align-items-center">
									<span className="text-white me-3">Hola, {user.name}</span>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory("AUTO")}
										title="Ver historial de autos">
										📋 Historial Auto
									</button>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory()}
										title="Ver todo el historial">
										📋 Historial General
									</button>
									<button
										className="btn btn-outline-light btn-sm"
										onClick={handleLogout}>
										Cerrar Sesión
									</button>
								</div>
							</div>
						</nav>

						<div className="container py-4">
							<CarInsuranceForm
								onCancel={handleBackToDashboard}
								onShowHistory={() => handleShowHistory("AUTO")}
							/>
						</div>
					</div>
				);

			/// NUEVO CASO MOTOVEHÍCULOS ///
			case "motorcycleInsurance":
				return (
					<div className="min-vh-100 bg-light">
						<nav className="navbar navbar-dark bg-primary shadow-sm">
							<div className="container">
								<span className="navbar-brand mb-0 h1 fw-bold">
									SeguroNoCobras
								</span>
								<div className="d-flex align-items-center">
									<span className="text-white me-3">Hola, {user.name}</span>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory("MOTO")}
										title="Ver historial de motos">
										📋 Historial Moto
									</button>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory()}
										title="Ver todo el historial">
										📋 Historial General
									</button>
									<button
										className="btn btn-outline-light btn-sm"
										onClick={handleLogout}>
										Cerrar Sesión
									</button>
								</div>
							</div>
						</nav>

						<div className="container py-4">
							<MotorcycleInsuranceForm
								onCancel={handleBackToDashboard}
								onShowHistory={() => handleShowHistory("MOTO")}
							/>
						</div>
					</div>
				);

			case "lifeInsurance":
				return (
					<div className="min-vh-100 bg-light">
						<nav className="navbar navbar-dark bg-primary shadow-sm">
							<div className="container">
								<span className="navbar-brand mb-0 h1 fw-bold">
									SeguroNoCobras
								</span>
								<div className="d-flex align-items-center">
									<span className="text-white me-3">Hola, {user.name}</span>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory("VIDA")}
										title="Ver historial de vida">
										📋 Historial Vida
									</button>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={() => handleShowHistory()}
										title="Ver todo el historial">
										📋 Historial General
									</button>
									<button
										className="btn btn-outline-light btn-sm"
										onClick={handleLogout}>
										Cerrar Sesión
									</button>
								</div>
							</div>
						</nav>

						<div className="container py-4">
							<LifeInsuranceForm
								onCancel={handleBackToDashboard}
								onShowHistory={() => handleShowHistory("VIDA")}
							/>
						</div>
					</div>
				);

			case "history":
				return (
					<div className="min-vh-100 bg-light">
						<nav className="navbar navbar-dark bg-primary shadow-sm">
							<div className="container">
								<span className="navbar-brand mb-0 h1 fw-bold">
									SeguroNoCobras
								</span>
								<div className="d-flex align-items-center">
									<span className="text-white me-3">Hola, {user.name}</span>
									<button
										className="btn btn-outline-light btn-sm me-2"
										onClick={handleBackToDashboard}>
										← Volver al Escritorio
									</button>
									<button
										className="btn btn-outline-light btn-sm"
										onClick={handleLogout}>
										Cerrar Sesión
									</button>
								</div>
							</div>
						</nav>

						<div className="container py-4">
							<QuoteHistory
								quotes={historyQuotes}
								onClose={handleBackToDashboard}
								onQuotesUpdate={handleQuotesUpdate}
								insuranceType={historyType}
							/>
						</div>
					</div>
				);

			case "dashboard":
			default:
				return (
					<Dashboard
						user={user}
						onSelectInsurance={handleSelectInsurance}
						onLogout={handleLogout}
						onShowHistory={handleShowHistory}
					/>
				);
		}
	};

	return renderCurrentView();
};

export default App;
