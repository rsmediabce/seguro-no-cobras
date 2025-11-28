// src/components/Login.tsx
// Componente de Login para que los usuarios ingresen al sistema

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../validation/schemas";
import { authenticateUser } from "../services/userService";
import { showErrorAlert, showSuccessAlert } from "../utils/alerts";
import { LoginData } from "../types";

interface LoginProps {
	onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
	const initialValues: LoginData = {
		email: "",
		password: "",
	};

	const handleSubmit = async (values: LoginData, { setSubmitting }: any) => {
		try {
			const user = authenticateUser(values.email, values.password);

			if (user) {
				await showSuccessAlert(
					`¡Bienvenido, ${user.name}!`,
					"Has ingresado correctamente al sistema."
				);
				onLogin({
					id: user.id,
					email: user.email,
					name: user.name,
				});
			} else {
				await showErrorAlert(
					"Credenciales incorrectas",
					"Por favor, verifica tu email y contraseña."
				);
			}
		} catch (error) {
			await showErrorAlert(
				"Error",
				"Ha ocurrido un error al intentar ingresar."
			);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center"
			style={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				backgroundImage: 'url("/assets/imageBackground.jpg")',
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-4">
						<div className="card shadow-lg border-0 rounded-3">
							<div className="card-body p-5">
								<div className="text-center mb-4">
									<h2 className="card-title fw-bold text-primary">
										SeguroNoCobras
									</h2>
									<p className="text-muted">Ingresa a tu portal de seguros</p>
								</div>

								<Formik
									initialValues={initialValues}
									validationSchema={loginSchema}
									onSubmit={handleSubmit}>
									{({ isSubmitting, errors, touched }) => (
										<Form>
											<div className="mb-3">
												<label htmlFor="email" className="form-label">
													Email
												</label>
												<Field
													type="email"
													name="email"
													className={`form-control form-control-lg ${
														errors.email && touched.email ? "is-invalid" : ""
													}`}
													placeholder="tu@email.com"
												/>
												<ErrorMessage
													name="email"
													component="div"
													className="invalid-feedback"
												/>
											</div>

											<div className="mb-4">
												<label htmlFor="password" className="form-label">
													Contraseña
												</label>
												<Field
													type="password"
													name="password"
													className={`form-control form-control-lg ${
														errors.password && touched.password
															? "is-invalid"
															: ""
													}`}
													placeholder="••••••••"
												/>
												<ErrorMessage
													name="password"
													component="div"
													className="invalid-feedback"
												/>
											</div>

											<div className="d-grid">
												<button
													type="submit"
													className="btn btn-primary btn-lg"
													disabled={isSubmitting}>
													{isSubmitting ? "Ingresando..." : "Ingresar"}
												</button>
											</div>
										</Form>
									)}
								</Formik>

								<div className="text-center mt-4">
									<small className="text-muted">
										Usuarios de prueba:
										<br />
										usuario@ejemplo.com / password123
										<br />
										admin@seguros.com / admin123
										<br />
										test@test.com / test123
									</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
