// src/components/form/FormField.tsx
// Componente reutilizable para campos de formulario con validación de Formik
import React from "react";
import { Field, ErrorMessage, useField } from "formik";

interface FormFieldProps {
	label: string;
	name: string;
	type?: string;
	as?: string;
	placeholder?: string;
	options?: { value: string; label: string }[];
	[key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	name,
	type = "text",
	as = "input",
	placeholder,
	options,
	...props
}) => {
	const [, meta] = useField(name); // ← Uso coma para omitir 'field'

	const inputClassName = `form-control ${
		meta.touched && meta.error ? "is-invalid" : ""
	}`;
	const selectClassName = `form-select ${
		meta.touched && meta.error ? "is-invalid" : ""
	}`;

	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label}
			</label>
			{as === "select" ? (
				<Field as="select" name={name} className={selectClassName} {...props}>
					<option value="">Seleccionar...</option>
					{options?.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</Field>
			) : as === "textarea" ? (
				<Field
					as="textarea"
					name={name}
					className={inputClassName}
					placeholder={placeholder}
					{...props}
				/>
			) : (
				<Field
					type={type}
					name={name}
					className={inputClassName}
					placeholder={placeholder}
					{...props}
				/>
			)}
			<ErrorMessage name={name} component="div" className="invalid-feedback" />
		</div>
	);
};

export default FormField;
