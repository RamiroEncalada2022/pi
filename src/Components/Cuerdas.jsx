import React, { useState } from 'react'
import style from "./Styles/Recommendations.module.css"
import { useContextGlobal } from './utils/global.context'
import Card from './Card'
import Pagination from './Pagination'


const Cuerdas = () => {
    const { state } = useContextGlobal()
    console.log(state)
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalProducts = state.instrumentos2.length
   

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage


    //Validar que sea de cuerdas y filtrar

    // var fragmentoID = window.location.pathname;


    // function obtenerPath(elemento) {
    //     // Utiliza una expresión regular para dejar solo texto y espacios en blanco
    //     var path = elemento.replace(/[^a-zA-Z\s]/g, '');
    
    //     // Devuelve el texto limpio
    //     return path;
    // }

    // var soloPath = obtenerPath(fragmentoID)
    // console.log(soloPath)


    //Mostrar solo los de cuerdas

    const filterInstrumentos = (instrumento) => {
        return instrumento.id === 1 || instrumento.id === 4 || instrumento.id === 5 ;
    };

    const filteredInstrumentos = state.instrumentos2.filter(filterInstrumentos);
    

    
      
    return (
        <div className={style.container}>
            <div className={style.containerCards}>
            {filteredInstrumentos.slice(firstIndex, lastIndex).map((instrumento) => (
                    <Card key={instrumento.id}
                        instrumento={instrumento} />


                ))}
            </div>
            <Pagination
                    productsPerPage={productsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalProducts={totalProducts}
                />
        </div>
    )
}

export default Cuerdas