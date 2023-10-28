import axios from 'axios';
import React, { useState } from 'react';
import styles from './Style/AddProduct.module.css'; // Asegúrate de que el nombre del archivo sea 'AddProduct.module.css'
import { useContextGlobal } from '../Components/utils/global.context';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const { dispatch } = useContextGlobal(); // Uso del contexto
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handlePost = () => {
    const data = {
      nombre: productName,
      descripcion: productDescription, // Ajusta esto por descripción para el backend, en este caso es lo que usamo de la api
      imagenes: productImages,
    };

    axios
      .post('http://localhost:8080/producto/registrar', data, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: 'ADD_INSTRUMENTO', payload: data }); // Actualiza el estado mediante el contexto con instrumentos2
      })
      .catch((error) => {
        console.error('Se produjo el siguiente error:', error);
      });
  };

  return (
    <div className={styles.container}>
      <input className={styles.text} type="text" value={productName} onChange={handleProductNameChange} placeholder="Nombre del producto" />
      <input className={styles.text} type="text" value={productDescription} onChange={handleProductDescriptionChange} placeholder="Descripcion del producto" />
      <input type="file" multiple onChange={handleImageChange} />
      <button className={styles.button} onClick={handlePost}>
        Agregar producto
      </button>
      <Link to="/admin" className={styles.buttonBack}>
        Volver
      </Link>
    </div>
  );
};

export default AddProduct;
