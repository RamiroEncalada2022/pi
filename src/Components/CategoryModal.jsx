// CategoryModal.js
import axios from 'axios';
import React, { useState } from 'react';
import { useContextGlobal } from './utils/global.context';
import styles from "./Styles/CategoryModal.module.css"

const CategoryModal = ({ setOpenModal }) => {

  const { state, dispatch } = useContextGlobal(); // Uso del contexto
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImage, setCategoryImage] = useState("");
  const [message, setMessage] = useState('');

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryDescriptionChange = (e) => {
    setCategoryDescription(e.target.value);
  };


  const handleCategoryImageChange = (e) => {
    setProductImages(e.target.value);
  };

  const handlePost = () => {
    const data = {
      titulo: categoryName,
      descripcion: categoryDescription, // Ajusta esto por descripción para el backend, en este caso es lo que usamo de la api
      urlImagen: categoryImage,
    };

    axios
      .post('http://localhost:8080/api/categorias/registrar', data, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        console.log("La respuesta que da el llamado:");
        console.log(response.data)
        dispatch({ type: 'ADD_CATEGORIA', payload: response.data }); // Actualiza el estado mediante el contexto con instrumentos2
        console.log("valor actual del state(lista): ")
        console.log(state)
        //Mensaje en caso de exito
        setMessage('Categoria agregada exitosamente');
        setTimeout(() => {
          setMessage('');
        }, 3000);

        //Borra datos de inputs
        setCategoryName('')
        setCategoryDescription('')
        setCategoryImage("")
      })
      .catch((error) => {
        console.error('Se produjo el siguiente error:', error);

        //Mensaje en caso de error
        setMessage('Error al agregar la categoría');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.effectGlass} style={{ width: '550px' }} >
        <div className={styles.container}>
          <h2 className={styles.subtitulo}>Añadir Nueva Categoria</h2>
          <input className={styles.text} type="text" value={categoryName} onChange={handleCategoryNameChange} placeholder="Nombre de la categoría" />
          <input className={styles.text} type="text" value={categoryDescription} onChange={handleCategoryDescriptionChange} placeholder="Descripcion de la categoría" />
          <div className={styles.contentFile}>
            <label htmlFor="archivo" className={styles.label}>Agregar imagen</label>
            <input type="file" className={styles.archivo} onChange={handleCategoryImageChange} id="archivo" />
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.button} onClick={handlePost}>
              Agregar categoria
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
          {message && <div className={`${styles.message} ${message ? styles.show : ''}`}>{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;