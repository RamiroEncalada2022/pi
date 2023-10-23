import React from 'react'
import { createContext, useContext, useEffect, useReducer} from "react";




export const ContextGlobal = createContext();


const initialState = {
  instrumentos: [],
}


function reducer(state, action){
  switch(action.type){
    case "GET_INSTRUMENTOS":
      return {...state, instrumentos: action.payload};
    
    default:
      throw new Error()
  }
}
   


export const ContextProvider = ({ children }) => {

  const [state, dispatch]= useReducer(reducer, initialState)

  useEffect(()=>{      
    fetch("https://rickandmortyapi.com/api/character")
    .then((response) => 
       response.json())
    .then((data)=> {      
      console.log(data)
      dispatch({type: "GET_INSTRUMENTOS", payload: data.results })
    })
  }, [])


  return (
    <ContextGlobal.Provider value={{state, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  );
};




export const useContextGlobal = ()=> useContext(ContextGlobal)
