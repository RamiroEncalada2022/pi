import { useContext, useState } from "react";
import { useContextGlobal } from "./utils/global.context";
import axios from "axios";
import style from "./Styles/Login.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const { state, dispatch } = useContextGlobal(); // Utiliza directamente el contexto sin el hook useContext
	//console.log(state)
	const navigateTo = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const isEmailValid = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleLogin = async () => {
		if (!password) {
			setError("Por favor, complete todos los campos.");
			return;
		}

		if (!isEmailValid(email)) {
			setError("Por favor, introduzca un correo electrónico válido.");
			return;
		}

		try {
			/* ---------------- Respuesta para cuando este andando la api --------------- */

			//const response = await axios.post('http://localhost:8080/api/auth/login', {
			//email: email,
			//password: password,
			//});

			/* ------------------------- Simulación de respuesta ------------------------ */
			const response = {
				status: 200,
				data: {
					user: {
						// Estructura de datos de usuario simulada
						name: "Sergio",
						surname: "Marquez",
						email: email,
						token: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
						rol: "USER",
					},
				},
			};
			console.log("Respuesta del servidor simulado: " + response.data.user);

			if (response.status === 200) {
				dispatch({ type: "LOGIN", payload: response.data.user });
				// Guardar el token en localStorage
				localStorage.setItem("token", response.data.user.token);
				navigateTo("/");
			}
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			setError(
				"Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo."
			);
		}
	};

	return (
		<div className={style.container}>
			<input
				type="email"
				placeholder="Correo electrónico"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Contraseña"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<div className={style.containerButton}>
				<button onClick={handleLogin}>Iniciar sesión</button>
				{error && <div className={style.error}>{error}</div>}
			</div>
		</div>
	);
};

export default Login;
