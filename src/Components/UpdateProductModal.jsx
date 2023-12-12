import React, { useState, useEffect } from 'react'
import { ContextGlobal, useContextGlobal } from './utils/global.context'
import styles from "./Styles/CategoryModal.module.css"
import axios from 'axios';
import CategoriaMenu from "./CategoryMenu"
import CategoryModal from './CategoryModal';
import { Link } from 'react-router-dom';
import UpdateImagesModal from './UpdateImagesModal';


const UpdateProductModal = ({ setOpenUpdateModal, rowData }) => { //VIENE DE LIST

const { nombre, descripcion, categoria, imagenes } = rowData //VIENE DE LIST

const { state, dispatch } = useContextGlobal(); // Uso del contexto

const [message, setMessage] = useState('');

const [productName, setProductName] = useState(nombre);
const [productDescription, setProductDescription] = useState(descripcion);
const [productCategory, setProductCategory] = useState(categoria)
const [productImages, setProductImages] = useState(imagenes);



const [modalOpen, setModalOpen] = useState(false);
const [modalImagesOpen, setModalImagesOpen] =useState(false)


  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handleProductDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

 

  const handleProductCategoryChange= (e) => {

    e.target.value === "agregar"? setModalOpen(true) : setProductCategory(e.target.value);
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages((prevProductImages)=>[...prevProductImages, files])
  };
 

  
  const [instrumentoImagenes, setInstrumentoImagenes]=useState([])
 
   

 const handleProductImagesChange = (imagenes)=>{
   if (window.confirm('¿Confirma que desea editar las imagenes del producto?')) {
    setInstrumentoImagenes(imagenes);
    setModalImagesOpen(true)
    

 }      
   };


   
  



  
  const data = {
    nombre: productName,
    descripcion: productDescription, // Ajusta esto por descripción para el backend, en este caso es lo que usamo de la api
    categoria: productCategory,
    
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

      
      
        <button className={styles.button} onClick={()=>handleProductImagesChange(imagenes)}>Editar Imagenes</button>
        {modalImagesOpen && <UpdateImagesModal setOpenImagesModal={setModalImagesOpen} instrumentoImagenes={instrumentoImagenes} handleImageChange={handleImageChange}/>} 


  
      
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

