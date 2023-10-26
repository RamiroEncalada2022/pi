import React from 'react'
import style from "./Styles/Recommendations.module.css"
import { useContextGlobal } from './utils/global.context'
import { Link } from 'react-router-dom'
import Card from "./Card"

const Recommendations = () => {

  const { state } = useContextGlobal()
  console.log(state)

  const instrumentosRandom = [];

  for (let i = 0; i < state.instrumentos.length; i++) {
    const random = [Math.round(Math.random() * state.instrumentos.length - 1)]
    const instrumentoRandom = state.instrumentos[random];
    !(instrumentosRandom.includes(instrumentoRandom)) && instrumentosRandom.push(instrumentoRandom)
  };


  return (

    <div className={style.container}>

      {
        instrumentosRandom.map((instrumento) => <Card key={instrumento.id} instrumento={instrumento} />).slice(0, 10)
      }

      <Link to="/ListaInstrumentos">

      



      <button onClick={() => handleClick()} className="border-2 mt-4 bg-slate-600 text-white p-2">Lista Completa</button>

      </Link>




    </div>

  )

}

export default Recommendations