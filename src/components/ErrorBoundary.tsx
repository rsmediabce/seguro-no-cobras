// src/components/ErrorBoundary.tsx
// Componente Error Boundary para capturar errores en la UI y mostrar un mensaje amigable

import React from "react";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

class ErrorBoundary extends React.Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error capturado por Error Boundary:", error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			return (
				<div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-6">
								<div className="card shadow-lg border-0">
									<div className="card-body text-center p-5">
										<div className="mb-4">
											<span style={{ fontSize: "4rem" }}>⚠️</span>
										</div>
										<h2 className="text-danger fw-bold mb-3">
											¡Ups! Algo salió mal
										</h2>
										<p className="text-muted mb-4">
											Ha ocurrido un error inesperado. Por favor, intenta
											recargar la página.
										</p>
										<div className="d-grid gap-2 d-md-flex justify-content-md-center">
											<button
												className="btn btn-primary"
												onClick={() => window.location.reload()}>
												Recargar Página
											</button>
											<button
												className="btn btn-outline-secondary"
												onClick={this.handleReset}>
												Intentar de Nuevo
											</button>
										</div>
										{this.state.error && (
											<details className="mt-4 text-start">
												<summary className="text-muted cursor-pointer">
													Detalles del error
												</summary>
												<pre className="mt-2 p-3 bg-dark text-light rounded small">
													{this.state.error.stack}
												</pre>
											</details>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
