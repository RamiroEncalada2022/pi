import { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';

export const ContextGlobal = createContext();

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
  caracteristicas: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "GET_INSTRUMENTOS":
      return { ...state, instrumentos: action.payload };
    case "GET_INSTRUMENTOS_2":
      return { ...state, instrumentos2: action.payload };
    case 'DELETE_INSTRUMENTO':{
      const updatedInstrumentos = state.instrumentos2.filter(
        (instrumento2) => instrumento2.id !== action.payload
      );
      return { ...state, instrumentos2: updatedInstrumentos };}
    case 'ADD_INSTRUMENTO':
      return { ...state, instrumentos2: [...state.instrumentos2, action.payload] };
    case "GET_CATEGORIAS": 
      return { ...state, categorias: action.payload };
    case 'ADD_CATEGORIA': 
      return { ...state, categorias: [...state.categorias, action.payload] }; 
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
    case 'LOGIN':
      return { ...state, loggedIn: true, user: action.payload };
    case 'LOGOUT':
      return { ...state, loggedIn: false, user: {
        name: "usuario",
        surname: "invitado",
        email: "",
        token: "",
        rol: "",
      } };
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
        default:
          console.error(`Acción desconocida: ${action.type}`);
          return state; 
  }
}

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response2 = await axios.get('http://localhost:8080/api/producto');
      dispatch({ type: "GET_INSTRUMENTOS_2", payload: response2.data });
    } catch (error) {
      console.error('Se produjo el error:', error);
    }
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  const fetchDataUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:8080/api/usuarios', config);
      if (response.status === 200) {
      dispatch({ type: "GET_USUARIOS", payload: response.data });
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
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




  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
