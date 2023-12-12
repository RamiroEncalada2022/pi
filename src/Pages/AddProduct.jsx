import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './Style/AddProduct.module.css';
import { useContextGlobal } from '../Components/utils/global.context';
import { Link } from 'react-router-dom';
import CategoriaMenu from '../Components/CategoryMenu';
import CategoryModal from '../Components/CategoryModal';
import CaracteristicasSelector from '../Components/CaracteristicasSelector';

const AddProduct = () => {
  const { state, dispatch } = useContextGlobal(); // Uso del contexto
  const token = localStorage.getItem('token');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  // Nuevo estado para las características seleccionadas
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleProductCategoryChange = (e) => {
    setProductCategory(e.target.value);
    if (e.target.value === 'agregar') {
      setModalOpen(true);
    }
  };

  const handleCaracteristicasChange = (selected) => {
    setSelectedCaracteristicas(selected);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const handlePost = () => {
    const caracteristicasEnFormatoCorrecto = selectedCaracteristicas.map((id) => ({ id }));

    const data = {
      nombre: productName,
      descripcion: productDescription,
      categoria: { id: productCategory },
      caracteristicas: caracteristicasEnFormatoCorrecto,
    };

    axios
      .post('http://localhost:8080/api/producto/registrar', data, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: 'ADD_INSTRUMENTO', payload: response.data });
        setMessage('Producto agregado exitosamente');
        setTimeout(() => {
          setMessage('');
        }, 3000);

        setProductName('');
        setProductDescription('');
        setProductCategory('');
        setProductImages([]);
      })
      .catch((error) => {
        console.error('Se produjo el siguiente error:', error);
        setMessage('Error al agregar el producto');
        setTimeout(() => {
          setMessage('');
        }, 3000);
      });
  };

  useEffect(() => {
    // Cargar características al montar el componente
    fetchDataCharacteristics();
  }, []);

  const fetchDataCharacteristics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/caracteristicas');
      dispatch({ type: 'GET_CARACTERISTICAS', payload: response.data });
    } catch (error) {
      console.error('Error al obtener las características:', error);
    }
  };

  return (
    <div className={styles.effectGlass}>
      <div className={styles.container}>
        <h2 className={styles.subtitulo}>Añadir Nuevo Artículo</h2>
        <input
          className={styles.text}
          type="text"
          value={productName}
          onChange={handleProductNameChange}
          placeholder="Nombre del producto"
        />
        <input
          className={styles.text}
          type="text"
          value={productDescription}
          onChange={handleProductDescriptionChange}
          placeholder="Descripcion del producto"
        />
        <CategoriaMenu handleProductCategoryChange={handleProductCategoryChange} />
        {modalOpen && <CategoryModal setOpenModal={setModalOpen} />}
        {/* Utiliza el componente CaracteristicasSelector y pasa las características del contexto */}
        <CaracteristicasSelector
          caracteristicas={state.caracteristicas}
          onChange={handleCaracteristicasChange}
        />

        <div className={styles.contentFile}>
          <label htmlFor="archivo" className={styles.label}>
            Agregar imagen
          </label>
          <input type="file" className={styles.archivo} multiple onChange={handleImageChange} id="archivo" />
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
