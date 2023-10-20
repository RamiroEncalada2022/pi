import React from 'react'
import style from './Styles/Categories.module.css'


const Categories = () => {
  return (
    <div className={style.container}>

      <div className='caja1'>
      <img className= 'clasica' src="./img/clasica.webp" alt="clasica" ></img>
      <h2>Guitarra Clásica Yamaha Cg102</h2>
      <h5>Caracteristicas: Tapa laminada. Mástil de caoba africana. Diapasón de ébano.</h5>
      <h3>USD375,00</h3></div>
      
      <div className='caja2'>
      <img className= 'electrica2' src="./img/electrica2.webp" alt="electrica2" ></img>
      <h2>Guitarra Electrica Prs 24 Translucent</h2>
      <h5>Caracteristicas: Material del cuerpo Caoba. Perfil del mástil Wide Thin.</h5>
      <h3>USD1.165,00</h3></div>

      <div className='caja3'>
      <img className= 'bateria' src="./img/bateria.webp" alt="bateria" ></img>
      <h2>Bateria Mapex Venus Ve5044ftcvh</h2>
      <h5> Caracteristicas: Cantidad de cuerpos	5c</h5>
      <h3>USD1.545,00</h3></div>

      <div className='caja4'>
      <img className= 'violin' src="./img/violin.webp" alt="violin" ></img>
      <h2>Violin Cremona Sv130 4/4</h2>
      <h5>Caracteristicas: Tapa laminada. Mástil de caoba africana. Diapasón de ébano.</h5>
      <h3>USD319,00</h3></div>

      <div className='caja5'>
      <img className= 'electrica1' src="./img/electrica1.webp" alt="electrica1" ></img>
      <h2>Guitarra Electrica Epiphone Les Paul 50s</h2>
      <h5>Caracteristicas: Forma Les Paul. Material Caoba. Tapa de arce duro tallado</h5>
      <h3>USD974,25</h3></div>

      <div className='caja6'>
      <img className= 'ampli' src="./img/ampli.webp" alt="ampli" ></img>
      <h2>Amplificador Guitarra Memphis Ak15 15w</h2>
      <h5>Caracteristicas: Woofer	6''</h5>
      <h3>USD95,00</h3></div>

      <div className='caja7'>
      <img className= 'tester' src="./img/tester.webp" alt="tester" ></img>
      <h2>Tester Behringer Ct200</h2>
      <h5>Caracteristicas:  Speakon *, TRS (¼ ", 1/8"), RCA, RJ45, MIDI y USB..</h5>
      <h3>USD85,00</h3></div>

      <div className='caja8'>
      <img className= 'piano' src="./img/piano.webp" alt="piano" ></img>
      <h2>Piano Digital Yamaha Csp170b</h2>
      <h5>Caracteristicas: 88 Teclas. Teclado NW con Escape. 721 Voces. 470 Estilos</h5>
      <h3>USD4.999,00</h3></div>

      <div className='caja9'>
      <img className= 'micro' src="./img/micro.webp" alt="micro" ></img>
      <h2>Micrófono Condensador Behringer Bv44</h2>
      <h5>Caracteristicas: Condensador</h5>
      <h3>USD259,00</h3></div>

      <div className='caja10'>
      <img className= 'guiro' src="./img/guiro.webp" alt="guiro" ></img>
      <h2>Block Memphis Dp205 Infantil</h2>
      <h5>Caracteristicas: Hecho de caoba africana.</h5>
      <h3>USD5,00</h3></div>
    
    </div>
  )
}

export default Categories