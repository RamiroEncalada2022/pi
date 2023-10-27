import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './Style/AddProduct.module.css'
import { useContextGlobal } from '../Components/utils/global.context'

const AddProduct = () => {
  const { dispatch } = useContextGlobal(); // Uso del contexto
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImages, setProductImages] = useState([]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handlePost = () => {
    const data = {
      name: productName,
      price: productPrice, // Ajusta esto por descripción para el backend, en este caso es lo que usamo de la api 
    };

    axios.post('https://jsonplaceholder.typicode.com/posts', data, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => {
        console.log(response.data);
        dispatch({ type: 'ADD_INSTRUMENTO', payload: data }); // Actualiza el estado mediante el contexto con instrumentos2

      })
      .catch((error) => {
        console.error('Se produjo el siguient error:', error);
      });
  };

  return (
    <div className={styles.container}>
      <input className={styles.text} type="text" value={productName} onChange={handleProductNameChange} placeholder="Nombre del producto" />
      <input className={styles.text} type="number" value={productPrice} onChange={handleProductPriceChange} placeholder="Precio del producto" />
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handlePost}>Agregar producto</button>
    </div>
  );
};

export default AddProduct;