import React from 'react'
import style from './Styles/Categories.module.css'


const Categories = () => {
  return (
    <div className={style.container}>

      <div className={style.instrument}>
        <h3>Instrumentos de cuerda</h3>
        <img className= 'chords' src="./img/cuerda.jpg" alt="cuerdas" ></img>
      </div>

      <div className={style.instrument}>
        <h3>Instrumentos de percusión</h3>
        <img className= 'percu' src="./img/percusion.jpg" alt="percusion" ></img>
      </div>

      <div className={style.instrument}>
      <h3>Instrumentos de viento</h3>
      <img className= 'air' src="./img/viento.jpg" alt="viento" ></img>
      </div>

      <div className={style.instrument}>
      <h3>Otros</h3>
      <img className= 'others' src="./img/otros.jpg" alt="otros" ></img>
      </div>
    
    </div>
  )
}

export default Categories