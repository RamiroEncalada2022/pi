import React, { useState } from 'react'
import style from "./Styles/Recommendations.module.css"
import { useContextGlobal } from './utils/global.context'
import Card from "./Card"
import Pagination from './Pagination'

const ProductList = () => {

    const { state } = useContextGlobal()
    console.log(state)
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const totalProducts = state.instrumentos2.length
   

    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage

    return (
        <div className={style.container}>
            <div className={style.containerCards}>
                {state.instrumentos2.slice(firstIndex, lastIndex).map((instrumento) =>(
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

export default ProductList;