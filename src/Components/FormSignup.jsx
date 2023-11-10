import { useState } from "react";
import styles from "../Components/Styles/Fromsignup.module.css";
import Input from "./Input";

const FormSignup = () => {
	const [user, setUser] = useState({
		nombre: "",
		apellido: "",
		email: "",
		password: "",
		role: "USER",
	});

	const [show, setShow] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const emailRegex = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/;
		// /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

		console.log(user.email.match(emailRegex));
		if (
			user.nombre.length > 1 &&
			user.email.match(emailRegex) &&
			user.apellido.length > 1 &&
			user.password.length > 4
		) {
			setShow(true);
			setError(false);
		} else {
			setShow(false);
			setError(true);
		}
	};

	console.log(user);
	const handlePostRequest = () => {
		fetch("http://localhost:8080/api/usuarios/registrar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				// response.json()
				if (!response.ok) {
					throw new Error("Error en la solicitud POST");
				}
				return response.json();
			})

			.then((data) => {
				console.log("Solicitud POST exitosa", data);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={styles.name}>
					<Input
						type="text"
						value={user.nombre}
						onChange={(event) =>
							setUser({ ...user, nombre: event.target.value })
						}
						placeholder="Nombre"
						required
					/>
					{/* <label>Nombre</label>
					<input
						type="text" name="nombre"
						placeholder="Nombre"
						onChange={(event) =>
							setUser({ ...user, nombre: event.target.value })
						}
						required
					/> */}

					<label className={styles.label}>Apellido</label>
					<Input
						type="text"
						name="apellido"
						placeholder="Apellido"
						onChange={(event) =>
							setUser({ ...user, apellido: event.target.value })
						}
						required
					/>
				</div>

				<label className={styles.label}>Email</label>
				<Input
					type="email"
					placeholder="Correo electrónico "
					onChange={(event) =>
						setUser({ ...user, email: event.target.value })
					}
					required
				/>

				<label className={styles.label}>Contraseña</label>
				<Input
					type="password"
					placeholder="Contraseña"
					onChange={(event) =>
						setUser({ ...user, password: event.target.value })
					}
					required
				/>

				{error && (
					<h4 className={styles.error}>
						Por favor aseguresé de ingresar la información correctamente.
					</h4>
				)}

				{show ? (
					<>
						<h4 className={styles.complete}>
							Gracias {user.nombre} por registrarte! Te estará llegando
							un email de confirmación a {user.email}.
						</h4>
					</>
				) : null}

				<button onClick={handlePostRequest} className={styles.btnSend}>
					Registrarme
				</button>
			</form>
		</>
	);
};

export default FormSignup;
