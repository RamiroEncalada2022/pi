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
    case 'DELETE_CATEGORIA': {
        const updatedCategorias = state.categorias.filter(
          (categorias) => categorias.id !== action.payload
        );
        return { ...state, categorias: updatedCategorias };
    }
    case 'UPDATE_CATEGORIA': {
        const updatedCategorias = state.categorias.map((categorias) =>
            categorias.id === action.payload.id ? action.payload : categorias
        );
        return { ...state, categorias: updatedCategorias };
    }
    case "GET_CARACTERISTICAS": 
      return { ...state, caracteristicas: action.payload };
    case 'ADD_CARACTERISTICA': 
      return { ...state, caracteristicas: [...state.caracteristicas, action.payload] };
    case 'DELETE_CARACTERISTICA': {
      const updatedCaracteristicas = state.caracteristicas.filter(
        (caracteristica) => caracteristica.id !== action.payload
      );
      return { ...state, caracteristicas: updatedCaracteristicas };
    }
    case 'UPDATE_CARACTERISTICA': {
      const updatedCaracteristicas = state.caracteristicas.map((caracteristica) =>
          caracteristica.id === action.payload.id ? action.payload : caracteristica
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
    case 'UPDATE_USER_ROLE':{
        const userIdToPromote = action.payload;
  
        // Encuentra el usuario en el estado y actualiza su rol
        const updatedUsuarios = state.usuarios.map((usuario) =>
          usuario.id === userIdToPromote
            ? { ...usuario, rol: 'ADMIN' } 
            : usuario
        );
  
      return { ...state, usuarios: updatedUsuarios };}
  
		case "TOGGLE_FAV": {
			const updatedFavs = state.favs.includes(action.payload.instrumento)
				? state.favs.filter((item) => item !== action.payload.instrumento)
				: [...state.favs, action.payload.instrumento];
			console.log(action.payload);
			return { ...state, favs: updatedFavs };
		}
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload };
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

		//Fechas simuladas, para dar aleatoriamente a los productos
		const disponibilidadProductos = [
			[
				{ fechaInicio: '2023-11-25', fechaFin: '2023-11-30' },
				{ fechaInicio: '2023-12-05', fechaFin: '2023-12-10' },
			],
			[
				{ fechaInicio: '2023-12-01', fechaFin: '2023-12-15' },
				{ fechaInicio: '2023-12-20', fechaFin: '2023-12-25' },
			],
			[
				{ fechaInicio: '2024-01-01', fechaFin: '2024-01-10' },
				{ fechaInicio: '2024-01-15', fechaFin: '2024-01-20' },
			],
		];
		try {
		const response2 = await axios.get("http://localhost:8080/api/producto");
		// DISPONIBILIDA de los productos.
		const productosConDisponibilidad = response2.data.map((producto, index) => {
			// Agregar lógica para obtener los períodos de disponibilidad del producto desde tu backend
			// ...
			//le asigna un grupo de fechas distinta (3 casos) a los productos
			const fechasReservadas = disponibilidadProductos[index % disponibilidadProductos.length];



			// const fechasReservadas = [
			// 	{ fechaInicio: '2023-11-25', fechaFin: '2023-11-30' },
			// 	{ fechaInicio: '2023-12-05', fechaFin: '2023-12-10' },
			// se pueden agregar mas periodos...
			// ];
	
			return { ...producto, fechasReservadas };
		});
	
			dispatch({ type: "GET_INSTRUMENTOS_2", payload: productosConDisponibilidad });
		} catch (error) {
		console.error("Se produjo el error:", error);
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
    const response3 = await axios.get('http://localhost:8080/api/categorias')
    dispatch({ type: "GET_CATEGORIAS", payload: response3.data });
  } catch (error) {
    console.error('Se produjo el error:', error);
  }
};

useEffect(() => {
  fetchDataCharacteristics();
}, []);

const fetchDataCharacteristics = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/caracteristicas');
    console.log(response.data)
    dispatch({ type: "GET_CARACTERISTICAS", payload: response.data });
  } catch (error) {
    console.error('Error al obtener las características:', error);
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
