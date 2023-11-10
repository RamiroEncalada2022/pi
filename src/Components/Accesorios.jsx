import React, { useState } from 'react'
import Card from './Card';
import style from "./Styles/Recommendations.module.css"
import Pagination from './Pagination';
import { useContextGlobal } from './utils/global.context';

const Accesorios = () => {
    const { state } = useContextGlobal()
    console.log(state)
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalProducts = state.instrumentos2.length
   

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage

   //Validar que solo muestre las cards que tengan estos ID

   const filterInstrumentos = (instrumento) => {
    return instrumento.id === 2 || instrumento.id === 6 || instrumento.id === 7 ;
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

export default Accesorios