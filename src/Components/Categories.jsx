import React from 'react'
import style from './Styles/Categories.module.css'


const Categories = () => {
  return (
    <div className={style.container}>

      <div className='cuerda'>
    
      <img className= 'chords' src="./img/cuerda.jpg" alt="cuerdas" ></img>
      </div>
      <div className='percusion'>
      
      <img className= 'percu' src="./img/percusion.jpg" alt="percusion" ></img>
      </div>
      <div className='viento'>
      
      <img className= 'air' src="./img/viento.jpg" alt="viento" ></img>
      </div>
      <div className='otros'>
      
      <img className= 'others' src="./img/otros.jpg" alt="otros" ></img>
      </div>
    
    </div>
  )
}

export default Categories