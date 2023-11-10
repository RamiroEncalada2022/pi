import React, { useState } from 'react'
import { useContextGlobal } from './utils/global.context';
import style from "./Styles/Recommendations.module.css"
import Card from './Card';
import Pagination from './Pagination';

const Viento = () => {
    //     const { state } = useContextGlobal()
    //     console.log(state)
    //     const [productsPerPage, setProductsPerPage] = useState(10);
    //     const [currentPage, setCurrentPage] = useState(1);
    //     const totalProducts = state.instrumentos2.length


    //     const lastIndex = currentPage * productsPerPage;
    //     const firstIndex = lastIndex - productsPerPage

    //    //Validar que solo muestre las cards que tengan estos ID

    //    const filterInstrumentos = (instrumento) => {
    //     return instrumento.id === 1 || instrumento.id === 4 || instrumento.id === 5 ;
    // };

    // const filteredInstrumentos = state.instrumentos2.filter(filterInstrumentos);

    return (
        // <div className={style.container}>
        //     <div className={style.containerCards}>
        //     {filteredInstrumentos.slice(firstIndex, lastIndex).map((instrumento) => (
        //             <Card key={instrumento.id}
        //                 instrumento={instrumento} />


        //         ))}
        //     </div>
        //         <Pagination
        //                 productsPerPage={productsPerPage}
        //                 currentPage={currentPage}
        //                 setCurrentPage={setCurrentPage}
        //                 totalProducts={totalProducts}
        //             />
        //     </div>

        <div className= {style.errorDiv}>
            <div className= {style.errorH3img}>
            <img  src="./img/Error.jpg" alt="Error" />
            </div>
            <div className= {style.errorH3img}>
                <h3>"Lo sentimos, actualmente no disponemos de productos de esta categoría
                    para realizar reservas en este momento.
                    Por favor, inténtalo de nuevo más tarde o elige una categoría diferente para tu reserva."</h3>
            </div>
        </div>
    )
}
export default Viento