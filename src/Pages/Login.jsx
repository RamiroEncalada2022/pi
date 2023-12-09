import { useContext, useEffect, useState } from "react";
import { useContextGlobal } from "../Components/utils/global.context";
import axios from "axios";
import style from "./Style/Login.module.css";
import { useNavigate } from "react-router-dom";
import searchUserForId from "../Components/searchUserForId";

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

			const response = await axios.post(
				"http://localhost:8080/api/auth/login",
				{
					email: email,
					password: password,
				}
			);
			console.log("Respuesta: ");
			console.log(response);

			/* ------------------------- Simulación de respuesta ------------------------ */
			// const response = {
			//     status: 200,
			//     data: {
			//         user: {
			//             // Estructura de datos de usuario simulada
			//             name: "Sergio",
			//             surname: "Marquez",
			//             email: email,
			//             token: "eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
			//             rol: "USER",
			//         },
			//     },
			// };
			// console.log("Respuesta del servidor simulado: " + response.data.user);

			if (response.status === 200) {
				const token = response.data.jwt;
				//id inventado hasta tener el del back
				//const id = 5;
				//buscar usuario

				const userWithId = await searchUserForId(
					response.data.usuarioId,
					token
				);
				console.log("datos que retorna la funcion buscar usuario");
				console.log(userWithId);
				const user = {
					name: userWithId.nombre,
					surname: userWithId.apellido,
					email: response.data.email,
					token: token,
					rol: userWithId.role,
					id:userWithId.id,
				};

				// const user = {
				//     name: "usuario",
				//     surname: "invitado",
				//     email: response.data.email,
				//     token: token,
				//     rol: "",
				//   };
				dispatch({ type: "LOGIN", payload: user });
				// Guardar el token en localStorage
				localStorage.setItem("token", response.data.jwt);
				console.log(JSON.stringify(response.data))
				localStorage.setItem("user", JSON.stringify(user));

				//navigateTo("/");
			}
		} catch (error) {
			console.error("Error al iniciar sesión:", error);
			setError(
				"Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo."
			);
		}


		// if (state.loggedIn && state.user.rol === 'ADMIN'){
		// 	navigateTo("/admin");
		// }
	};

	useEffect(() => {
		// Redirect logic when the component mounts
		if (state.loggedIn) {
		  if (state.user.rol === 'ADMIN') {
			navigateTo("/admin");
		  } else {
			navigateTo("/"); // Redirect to the app or any desired route for regular users
		  }
		}
	  }, [state.loggedIn, state.user.rol, navigateTo]);


	return (
		<div className={style.container}>
			<h1>Iniciar sesión</h1>

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
