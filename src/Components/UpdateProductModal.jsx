import React, { useState, useEffect } from 'react'
import { ContextGlobal, useContextGlobal } from './utils/global.context'
import styles from "./Styles/CategoryModal.module.css"
import axios from 'axios';
import CategoriaMenu from "./CategoryMenu"
import CategoryModal from './CategoryModal';


const UpdateProductModal = ({ setOpenUpdateModal, rowData }) => {

const { nombre, descripcion, categoria, imagenes } = rowData

const { state, dispatch } = useContextGlobal(); // Uso del contexto

const [message, setMessage] = useState('');

const [productName, setProductName] = useState('');
const [productDescription, setProductDescription] = useState('');
const [productCategory, setProductCategory] = useState("")
const [productImages, setProductImages] = useState([]);


const [modalOpen, setModalOpen] = useState(false);

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

 

  const handleProductCategoryChange= (e) => {
    // Your function code here
    console.log(e.target.value);
    e.target.value === "agregar"? setModalOpen(true) : setProductCategory(e.target.value);
  }



  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);
  };

  const data = {
    nombre: productName,
    descripcion: productDescription, // Ajusta esto por descripción para el backend, en este caso es lo que usamo de la api
    categoria: productCategory,
    imagenes: productImages,
  };

  const handlePut = async () => {
    console.log(data);
    try {
       const response = await axios.put(`http://localhost:8080/api/producto/actualizar`, data);
       console.log("La respuesta que da el llamado:");
       console.log(response.data);
       dispatch({ type: 'UPDATE_INSTRUMENTO', payload: data });
       console.log("valor actual del state(lista): ");
       console.log(state);
       // Mensaje en caso de éxito
       setMessage('Producto actualizado exitosamente');
       setTimeout(() => {
          setMessage('');
       }, 3000);
       // Borra datos de inputs
       setProductName('');
       setProductDescription('');
       setProductCategory('');
       setProductImages([]);
    } catch (error) {
       console.error('Se produjo el siguiente error:', error);
       // Mensaje en caso de error
       setMessage('Error al actualizar el producto');
       setTimeout(() => {
          setMessage('');
       }, 3000);
    }
 };


  





  return (
    <div>
    <div className={styles.modalContainer}>
    <div className={styles.effectGlass}>
    <div className={styles.container}>

     <h2 className={styles.subtitulo}>Editar Artículo</h2>
     <label>Nombre del producto</label>
      <input className={styles.text} type="text" defaultValue={nombre} onChange={handleProductNameChange}/>
      <label>Descripcion del producto</label>
      <input className={styles.text} type="text" defaultValue={descripcion} onChange={handleProductDescriptionChange}  />
      <CategoriaMenu   handleProductCategoryChange={handleProductCategoryChange}/>
      {modalOpen && <CategoryModal setOpenModal={setModalOpen} />}

      <div className={styles.contentFile}>
        <label htmlFor="archivo" className={styles.label}>Agregar imagen</label>
        <input type="file" className={styles.archivo} multiple onChange={handleImageChange} id="archivo"/>
      </div>
      
      <div className={styles.containerButtons}>
        <button className={styles.button} onClick={handlePut}>
          Confirmar
        </button>
        <button onClick={() => setOpenUpdateModal(false)}>X</button>
        {message && <div className={`${styles.message} ${message ? styles.show : ''}`}>{message}</div>}
        
      </div>
      

      




        </div>
        </div>
        </div>
        </div>)
}

export default UpdateProductModal

