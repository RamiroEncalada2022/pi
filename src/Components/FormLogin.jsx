import { useState } from "react";
import Input from "./Input";

export const FormLogin = () => {
	const [user, setUser] = useState({
		password: "",
		email: "",
	});


	const [error, setError] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const emailRegex =
			/^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

		console.log(user.email.match(emailRegex));
		if (user.name.length > 5 && user.email.match(emailRegex)) {
			setError(false);
		} else {
			setError(true);
		}
	};

	const handleChange = (event) =>
		setUser({ ...user, name: event.target.value });
	console.log(user);

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>
					Nombre completo
				</label>
				<Input  />
				<label>
					Email
					<input
						type="email"
						onChange={(event) =>
							setUser({ ...user, email: event.target.value })
						}
						required
					></input>
				</label>

				{error && (
					<h4>Por favor aseguresé de ingresar las credenciales correctamente.</h4>
				)}

				<button>Iniciar sesión</button>
			</form>
		</div>
	);
};
