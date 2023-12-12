import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

export const ContextGlobal = createContext();

const localFavs = JSON.parse(localStorage.getItem("favs"));
const initialFavState = localFavs ? localFavs : [];

const initialState = {
	instrumentos: [],
	instrumentos2: [],
	usuarios: [],
	categorias: [],
	loggedIn: false,
	user: {
		name: "usuario",
		surname: "invitado",
		email: "",
		token: "",
		rol: "",
	},
	searchText: "", // Nuevo estado para el texto de búsqueda
	favs: initialFavState,
	caracteristicas: [],
	reservas: [],
};

function reducer(state, action) {
	switch (action.type) {
		case "GET_INSTRUMENTOS":
			return { ...state, instrumentos: action.payload };
		case "GET_INSTRUMENTOS_2":
			return { ...state, instrumentos2: action.payload };
		case "DELETE_INSTRUMENTO": {
			const updatedInstrumentos = state.instrumentos2.filter(
				(instrumento2) => instrumento2.id !== action.payload
			);
			return { ...state, instrumentos2: updatedInstrumentos };
		}
		case "ADD_INSTRUMENTO":
			return {
				...state,
				instrumentos2: [...state.instrumentos2, action.payload],
			};
		case "GET_CATEGORIAS":
			return { ...state, categorias: action.payload };
		case "ADD_CATEGORIA":
			return { ...state, categorias: [...state.categorias, action.payload] };
		case "DELETE_CATEGORIA": {
			const updatedCategorias = state.categorias.filter(
				(categorias) => categorias.id !== action.payload
			);
			return { ...state, categorias: updatedCategorias };
		}
		case "UPDATE_CATEGORIA": {
			const updatedCategorias = state.categorias.map((categorias) =>
				categorias.id === action.payload.id ? action.payload : categorias
			);
			return { ...state, categorias: updatedCategorias };
		}
		case "GET_CARACTERISTICAS":
			return { ...state, caracteristicas: action.payload };
		case "ADD_CARACTERISTICA":
			return {
				...state,
				caracteristicas: [...state.caracteristicas, action.payload],
			};
		case "DELETE_CARACTERISTICA": {
			const updatedCaracteristicas = state.caracteristicas.filter(
				(caracteristica) => caracteristica.id !== action.payload
			);
			return { ...state, caracteristicas: updatedCaracteristicas };
		}
		case "UPDATE_CARACTERISTICA": {
			const updatedCaracteristicas = state.caracteristicas.map(
				(caracteristica) =>
					caracteristica.id === action.payload.id
						? action.payload
						: caracteristica
			);
			return { ...state, caracteristicas: updatedCaracteristicas };
		}
		case "LOGIN":
			return { ...state, loggedIn: true, user: action.payload };
		case "LOGOUT":
			return {
				...state,
				loggedIn: false,
				user: {
					name: "usuario",
					surname: "invitado",
					email: "",
					token: "",
					rol: "",
				},
			};
		case "GET_USUARIOS":
			return { ...state, usuarios: action.payload };
		case "UPDATE_USER_ROLE": {
			const userIdToPromote = action.payload;

			// Encuentra el usuario en el estado y actualiza su rol
			const updatedUsuarios = state.usuarios.map((usuario) =>
				usuario.id === userIdToPromote
					? { ...usuario, rol: "ADMIN" }
					: usuario
			);

			return { ...state, usuarios: updatedUsuarios };
		}

		case "TOGGLE_FAV": {
			const updatedFavs = state.favs.includes(action.payload.instrumento)
				? state.favs.filter((item) => item !== action.payload.instrumento)
				: [...state.favs, action.payload.instrumento];
			console.log(action.payload);
			return { ...state, favs: updatedFavs };
		}
		case "SET_SEARCH_TEXT":
			return { ...state, searchText: action.payload };
		case "UPDATE_RESERVAS_EN_PRODUCTO": {
			const { productId, fechasReservadas } = action.payload;
			const updatedInstrumentos = state.instrumentos2.map((producto) => {
				if (producto.id === productId) {
					return { ...producto, fechasReservadas };
				}
				return producto;
			});

			return { ...state, instrumentos2: updatedInstrumentos };
		}
		case "UPDATE_INSTRUMENTO": {
			const updatedInstrumento = action.payload;
			return {
				...state,
				instrumento2: state.instrumento2.map((instrumento) => {
					return instrumento.id === updatedInstrumento.id
						? updatedInstrumento
						: instrumento;
				}),
			};
		}
		case "GET_RESERVAS":
			return { ...state, reservas: action.payload };

		default:
			console.error(`Acción desconocida: ${action.type}`);
			return state;
	}
}
// localStorage.clear();
export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response2 = await axios.get(
				"http://localhost:8080/api/producto"
			);
			const productos = response2.data;
			console.log("Productos obtenidos:", productos);

			const reservasResponse = await axios.get(
				"http://localhost:8080/api/reservas"
			);

			const instrumentosConReservas = productos.map((producto) => {
				const reservas = reservasResponse.data.filter((reserva) =>
					reserva.productos.some((prod) => prod.id === producto.id)
				);

				const fechasReservadas = reservas.map((reserva) => ({
					fechaInicio: reserva.fechaInicio,
					fechaFin: reserva.fechaFin,
				}));

				return { ...producto, fechasReservadas };
			});
			console.log(
				"Instrumentos con fechas reservadas:",
				instrumentosConReservas
			);

			dispatch({
				type: "GET_INSTRUMENTOS_2",
				payload: instrumentosConReservas,
			});
		} catch (error) {
			console.error("Se produjo un error:", error);
		}
	};

	useEffect(() => {
		fetchDataUsers();
	}, []);

	const fetchDataUsers = async () => {
		const token = localStorage.getItem("token");
		try {
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			};
			const response4 = await axios.get(
				"http://localhost:8080/api/usuarios",
				config
			);
			if (response4.status === 200) {
				dispatch({ type: "GET_USUARIOS", payload: response4.data });
			}
		} catch (error) {
			console.error("Error al obtener los datos del usuario:", error);
		}
	};

	useEffect(() => {
		fetchDataCategory();
	}, []);

	const fetchDataCategory = async () => {
		try {
			const response3 = await axios.get(
				"http://localhost:8080/api/categorias"
			);
			dispatch({ type: "GET_CATEGORIAS", payload: response3.data });
		} catch (error) {
			console.error("Se produjo el error:", error);
		}
	};

	useEffect(() => {
		fetchDataCharacteristics();
	}, []);

	const fetchDataCharacteristics = async () => {
		try {
			const response = await axios.get(
				"http://localhost:8080/api/caracteristicas"
			);
			console.log(response.data);
			dispatch({ type: "GET_CARACTERISTICAS", payload: response.data });
		} catch (error) {
			console.error("Error al obtener las características:", error);
		}
	};

	/* Listar Reservas */

	useEffect(() => {
		fetchListarReservas();
	}, []);

	const fetchListarReservas = async () => {
		try {
			const response = await axios.get("http://localhost:8080/api/reservas");
			dispatch({ type: "GET_RESERVAS", payload: response.data });
		} catch (error) {
			console.error("Se produjo el error:", error);
		}
	};

	useEffect(() => {
		localStorage.setItem("favs", JSON.stringify(state.favs));
	}, [state.favs]);

	return (
		<ContextGlobal.Provider value={{ state, dispatch }}>
			{children}
		</ContextGlobal.Provider>
	);
};

export const useContextGlobal = () => useContext(ContextGlobal);
