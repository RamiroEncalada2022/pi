import React, { createContext, useContext, useEffect, useReducer } from "react";
import axios from 'axios';

export const ContextGlobal = createContext();

const initialState = {
  instrumentos: [],
  instrumentos2: [],
  loggedIn: false,
  user: {
    name: "usuario",
    surname: "invitado",
    email: "",
    token: "",
    rol: "",
  },
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
    default:
      throw new Error();
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
      console.log("Datos del back:");
      console.log(response2.data);
    } catch (error) {
      console.error('Se produjo el error:', error);
    }
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:8080/api/usuarios', config);
      if (response.status === 200) {
        dispatch({ type: 'LOGIN', payload: response.data });
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    }
  }, []);

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export const useContextGlobal = () => useContext(ContextGlobal);
