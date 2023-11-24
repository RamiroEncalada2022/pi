import React, { useContext, useState } from 'react';
import { useContextGlobal } from './utils/global.context'
import axios from 'axios';
import styles from './Styles/UpdateImagesModal.module.css'
//import styles from "./Styles/CategoryModal.module.css"
import { Link } from 'react-router-dom';


const UpdateImagesModal = ({ setOpenImagesModal, instrumentoImagenes, handleImageChange }) => {


  


  console.log(instrumentoImagenes)

  const { state, dispatch } = useContextGlobal(); // Uso del contexto

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar la imagen?')) {
      try {
        await axios.delete(`http://localhost:8080/api/imagen/eliminar/${id}`);
        dispatch({ type: 'DELETE_IMAGEN', payload: id }); // Actualizar el estado mediante el contexto con instrumentos2
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    }
  };






  return (






    <div className={styles.modalContainer}>
      <div className={styles.effectGlass} >
        <div className={styles.conteiner}>
          <div className={styles.tableContainer}>
            <div className={styles.cabecera}>

              <h2 className={styles.subtitulo}>Imagenes del Producto</h2>





            </div >

            

            <div>

              {instrumentoImagenes.map((imagen) => (

                

                
                  <div className={styles.tableRow} key={imagen}>



                 

                  <div >
                    <img src={imagen} alt="imagen" width={100} />
                  </div>

                 

                  <div>
                    <button onClick={() => handleDelete(imagen)}>
                      Eliminar
                    </button>
                    {console.log(imagen)}
                  </div>


                </div>
              ))}

<div className={styles.contentFile}>
        <label htmlFor="archivo" className={styles.label}>Agregar imagen</label>
        <input type="file" className={styles.archivo} multiple onChange={handleImageChange} id="archivo"/>
      </div>





              <button onClick={() => setOpenImagesModal(false)}>X</button>

            </div>
          </div>
        </div>
      </div>
    </div>


  );




}

export default UpdateImagesModal