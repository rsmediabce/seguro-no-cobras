// src/components/Dashboard.tsx
// Componente de Dashboard / Escritorio para seleccionar tipos de seguros y navegar en la aplicación

import React from "react";

interface InsuranceType {
	id: number;
	name: string;
	icon: string;
	description: string;
	color: string;
}

interface DashboardProps {
	user: any;
	onSelectInsurance: (insuranceType: string) => void;
	onLogout: () => void;
	onShowHistory: (type?: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
	user,
	onSelectInsurance,
	onShowHistory,
	onLogout,
}) => {
	const insuranceTypes: InsuranceType[] = [
		{
			id: 1,
			name: "CASA",
			icon: "🏠",
			description: "Protege tu hogar y pertenencias",
			color: "primary",
		},
		{
			id: 2,
			name: "Automóvil",
			icon: "🚗",
			description: "Cobertura para tu vehículo",
			color: "success",
		},
		{
			id: 3,
			name: "Motovehículos",
			icon: "🏍️",
			description: "Seguro para motos y scooters",
			color: "warning",
		},
		{
			id: 4,
			name: "Seguro de Vida",
			icon: "❤️",
			description: "Protección para tu familia",
			color: "danger",
		},
	];

	return (
		<div className="min-vh-100 bg-light">
			{/* Navbar */}
			<nav className="navbar navbar-dark bg-primary shadow">
				<div className="container-fluid">
					<span className="navbar-brand mb-0 h1 fw-bold">SeguroNoCobras</span>
					<div className="d-flex align-items-center">
						<span className="text-white me-3">Hola, {user.name}</span>
						<button
							className="btn btn-outline-light btn-sm me-2"
							onClick={() => onShowHistory()}
							title="Ver historial de todas las cotizaciones">
							📋 Historial General
						</button>
						<button className="btn btn-outline-light btn-sm" onClick={onLogout}>
							Cerrar Sesión
						</button>
					</div>
				</div>
			</nav>

			{/* Contenido Principal */}
			<div className="container py-5">
				<div className="text-center mb-5">
					<h1 className="display-5 fw-bold text-dark mb-3">
						¡Bienvenido a tu portal de seguros!
					</h1>
					<p className="lead text-muted mb-4">
						Selecciona el tipo de seguro que deseas cotizar
					</p>
				</div>

				<div className="row g-4">
					{insuranceTypes.map((insurance) => (
						<div key={insurance.id} className="col-md-6 col-lg-3">
							<div
								className="card h-100 shadow border-0"
								style={{ cursor: "pointer", transition: "transform 0.2s" }}
								onClick={() => onSelectInsurance(insurance.name)}
								onMouseEnter={(e) => {
									e.currentTarget.style.transform = "translateY(-5px)";
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.transform = "translateY(0)";
								}}>
								<div className="card-body text-center p-4">
									<div className="mb-3">
										<span style={{ fontSize: "3rem" }}>{insurance.icon}</span>
									</div>
									<h5 className={`card-title text-${insurance.color} fw-bold`}>
										{insurance.name}
									</h5>
									<p className="card-text text-muted">
										{insurance.description}
									</p>
									<button className={`btn btn-${insurance.color} mt-2`}>
										Cotizar Ahora
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
