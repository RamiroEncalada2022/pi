import { useState } from "react";
import styles from "./Styles/Fromsignup.module.css";
import Input from "./Input";

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
		const emailRegex = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/;
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

	console.log(user);
	const handlePostRequest = () => {
		fetch("http://localhost:8080/api/usuarios/registrar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json", // Ajusta los encabezados según tus necesidades
			},
			body: JSON.stringify(user),
		})
			.then((response) => {
				if (response.ok) {
					return response.json(); // Parsea la respuesta JSON si es exitosa
				} else {
					throw new Error("Error en la solicitud POST");
				}
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
						value={user.fname}
						onChange={(event) =>
							setUser({ ...user, fname: event.target.value })
						}
						placeholder="Nombre"
						required
					/>
					{/* <label>Nombre</label>
					<input
						type="text" name="fname"
						placeholder="Nombre"
						onChange={(event) =>
							setUser({ ...user, fname: event.target.value })
						}
						required
					/> */}

					<label>Apellido</label>
					<input
						type="text"
						name="lname"
						placeholder="Apellido"
						onChange={(event) =>
							setUser({ ...user, lname: event.target.value })
						}
						required
					/>
				</div>

				<label>Email</label>
				<input
					type="email"
					placeholder="Correo electrónico "
					onChange={(event) =>
						setUser({ ...user, email: event.target.value })
					}
					required
				/>

				<label>Contraseña</label>
				<input
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
							Gracias {user.fname} por registrarte! Te estará llegando un
							email de confirmación a {user.email}.
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
