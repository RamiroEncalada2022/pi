import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import Card from "./Card"
import style from "./Styles/Recommendations.module.css"

const ListaProductos = () => {


    const [page, setPage] = useState(0);
    const [instrumentos, setInstrumentos] = useState([]);


    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/?offset=${page}&limit=10`)


            .then((response) => response.json())
            .then((data) => {
                setInstrumentos(data.results)
            })

    }, [page])


    const handleClick = () => {
        setPage(page + 10);
    }


    return (
        <div>

            {
                instrumentos.map((instrumento) => <Card key={instrumento.id} instrumento={instrumento} />)
            }

            <button onClick={() => handleClick()} className="border-2 mt-4 bg-slate-600 text-white p-2">Siguiente</button>



        </div>
    )
}

export default ListaProductos