import axios from 'axios';
import React from 'react'
import { createContext, useContext, useEffect, useReducer} from "react";


export const ContextGlobal = createContext();


const initialState = {
  instrumentos: [],
  instrumentos2: [] //para trabajar en admin mientras no hay backend
};


function reducer(state, action){
  switch(action.type){
    case "GET_INSTRUMENTOS":
      return {...state, instrumentos: action.payload};
    case "GET_INSTRUMENTOS_2": // Este es el caso que se utiliza en el admin, luego se unificara con el de backend
      return {...state, instrumentos2: action.payload};
    case 'DELETE_INSTRUMENTO':{
        const updatedInstrumentos = state.instrumentos2.filter(
          (instrumento2) => instrumento2.id !== action.payload
        );
        return { ...state, instrumentos2: updatedInstrumentos };} //verificar que no falle
    case 'ADD_INSTRUMENTO':
    return { ...state, instrumentos2: [...state.instrumentos2, action.payload] };
    default:
      throw new Error();
  }
}


export const ContextProvider = ({ children }) => {
  const [state, dispatch]= useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const response = await axios.get('https://rickandmortyapi.com/api/character');
      //dispatch({ type: "GET_INSTRUMENTOS", payload: response.data.results });
      //const response2 = await axios.get('https://jsonplaceholder.typicode.com/posts');
      const response2 = await axios.get('http://localhost:8080/api/producto')
      dispatch({ type: "GET_INSTRUMENTOS_2", payload: response2.data });
      console.log("Daots del back:")
      console.log(response2.data)
    } catch (error) {
      console.error('Se produjo el error:', error);
    }
  };

  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};




export const useContextGlobal = ()=> useContext(ContextGlobal)