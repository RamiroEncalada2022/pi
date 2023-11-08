import axios from 'axios';
import { useState } from 'react';
import styles from '../AddProduct/AddProduct.module.css'; 
import { useContextGlobal } from '../../Components/utils/global.context';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const { state, dispatch } = useContextGlobal(); // Uso del contexto
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [message, setMessage] = useState('');

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
        console.log("La respuesta que da el llamado:" );
        console.log(response.data)
        dispatch({ type: 'ADD_INSTRUMENTO', payload: response.data }); // Actualiza el estado mediante el contexto con instrumentos2
        console.log("valor actual del state(lista): ")
        console.log(state)
        //Mensaje en caso de exito
        setMessage('Producto agregado exitosamente');
        setTimeout(() => {
          setMessage('');
        }, 3000); 

        //Borra datos de inputs
        setProductName('')
        setProductDescription('')
        setProductImages([])
      })
      .catch((error) => {
        console.error('Se produjo el siguiente error:', error);

        //Mensaje en caso de error
        setMessage('Error al agregar el producto');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
  };

  return (
    <div className={styles.effectGlass}>
    <div className={styles.container}>
      <h2 className={styles.subtitulo}>Añadir Nuevo Artículo</h2>
      <input className={styles.text} type="text" value={productName} onChange={handleProductNameChange} placeholder="Nombre del producto" />
      <input className={styles.text} type="text" value={productDescription} onChange={handleProductDescriptionChange} placeholder="Descripcion del producto" />
      <div className={styles.contentFile}>
        <label htmlFor="archivo" className={styles.label}>Agregar imagen</label>
        <input type="file" multiple onChange={handleImageChange} id="archivo"/>
      </div>
      <div className={styles.containerButtons}>
        <button className={styles.button} onClick={handlePost}>
          Agregar producto
        </button>
        <Link to="/admin" className={styles.buttonBack}>
          Volver
        </Link>
      </div>
      {message && <div className={`${styles.message} ${message ? styles.show : ''}`}>{message}</div>} 
        </div>
        </div>
  );
};

export default AddProduct;
