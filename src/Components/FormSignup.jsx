import React, { useState } from "react";
import styles from "./Styles/Fromsignup.module.css";

const FormSignup = () => {
	const [user, setUser] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
	});

	const [show, setShow] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		const emailRegex =
			/^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
		// /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

		console.log(user.email.match(emailRegex));
		if (
			user.fname.length > 1 &&
			user.email.match(emailRegex) &&
			user.lname.length > 1 &&
			user.password.length > 4
		) {
			setShow(true);
			setError(false);
		} else {
			setShow(false);
			setError(true);
		}
	};

	const handleChange = (event) =>
		setUser({ ...user, fname: event.target.value });
	console.log(user);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className={styles.name}>
					<label>Nombre</label>
					<input
						type="text"
						placeholder="Nombre"
						onChange={handleChange}
						required
					></input>
					<label>Apellido</label>
					<input
						type="text"
						placeholder="Apellido"
						onChange={(event) =>
							setUser({ ...user, lname: event.target.value })
						}
						required
					></input>
				</div>

				<label>Email</label>
				<input
					type="email"
					placeholder="Correo electrónico "
					onChange={(event) =>
						setUser({ ...user, email: event.target.value })
					}
					required
				></input>

				<label>Contraseña</label>
				<input
					type="password"
					placeholder="Contraseña"
					onChange={(event) =>
						setUser({ ...user, password: event.target.value })
					}
					required
				></input>

				{error && (
					<h4 className={styles.error}>
						Por favor aseguresé de ingresar la información correctamente.
					</h4>
				)}

				{show ? (
					<>
						<h4 className={styles.complete}>
							Gracias {user.fname} por registrarte! Te estará llegando un
							email de confirmación a {user.email}.
						</h4>
					</>
				) : null}

				<button className={styles.btnSend}>Registrarme</button>
			</form>
		</>
	);
};

export default FormSignup;
