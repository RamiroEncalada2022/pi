import React from 'react'


import { createContext, useContext, useEffect, useReducer} from "react";

export const ContextGlobal = createContext();

/*const localFavs = JSON.parse(localStorage.getItem("favs"))*/
/*const initialFav = localFavs? localFavs: []*/


const initialState = {
  /*theme: true,*/
  instrumentos: [],
  /*favs: initialFav,*/
}

function reducer(state, action){
  switch(action.type){
    case "GET_INSTRUMENTOS":
      return {...state, instrumentos: action.payload};

    /*case "ADD_FAV":
      return {...state, favs : [...state.favs, action.payload] };*/

    /*case "DELETE_FAV":
      return {...state, favs: action.payload};*/

    /*case "ELIMINAR_FAVORITOS":
        return {...state, favs: []};*/


    /*case "SWITCH THEME":
      return {...state, theme: !state.theme};*/

      /*case "toggleTheme": {
        const newThemeKey = state.currentTheme.id === "dark" ? "light" : "dark";
        return { ...state, currentTheme: theme[newThemeKey] };*/

    default:
      throw new Error()
  }
}
   


export const ContextProvider = ({ children }) => {
  //Aqui deberan implementar la logica propia del Context, utilizando el hook useMemo

  const [state, dispatch]= useReducer(reducer, initialState)


  useEffect(()=>{      
    fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => 
     
    
       response.json())
    .then((data) => {

      


    


      
      dispatch({type: "GET_INSTRUMENTOS", payload: data })
    })

  }, [])


  /*useEffect(()=>{   

  localStorage.setItem("favs", JSON.stringify(state.favs) )
    
   }, [state.favs])*/



  return (
    <ContextGlobal.Provider value={{state, dispatch}}>
      {children}
    </ContextGlobal.Provider>
  );
};




export const useContextGlobal = ()=> useContext(ContextGlobal)
