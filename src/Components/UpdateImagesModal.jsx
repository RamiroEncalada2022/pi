import React, { useState } from 'react';
import axios from 'axios';
import styles from './Styles/UpdateImagesModal.module.css';

const UpdateImagesModal = ({ setOpenImagesModal, instrumentoImagenes, handleImageChange }) => {
  const token = localStorage.getItem('token');

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar la imagen?')) {
      try {
        await axios.delete(`http://localhost:8080/api/imagen/eliminar/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Manejar la eliminación desde el estado o contexto
      } catch (error) {
        console.error('Error al eliminar la imagen:', error);
      }
    }
  };

  const [newImageUrls, setNewImageUrls] = useState('');

  const handleAddImages = async () => {
    const urlsArray = newImageUrls.split('\n').filter((url) => url.trim() !== '');
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/imagen/actualizar`, // Reemplaza "productId" por el ID del producto existente
        { nuevasImagenes: urlsArray },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Manejar la respuesta del servidor aquí (actualizar el estado/contexto con las nuevas imágenes, etc.)
    } catch (error) {
      console.error('Error al agregar nuevas imágenes:', error);
    }
  };
  return (
    <div className={styles.modalContainer}>
      <div className={styles.effectGlass}>
        <div className={styles.container}>
          <h2 className={styles.subtitulo}>Imágenes del Producto</h2>
          <div className={styles.imageList}>
            {instrumentoImagenes.map(({ id, url }) => (
              <div className={styles.imageItem} key={id}>
                <img src={url} alt="imagen" width={100} />
                <div>
                  <button onClick={() => handleDelete(id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.contentFile}>
            <textarea
              className={styles.textarea}
              value={newImageUrls}
              onChange={(e) => setNewImageUrls(e.target.value)}
              placeholder="Pegue las URLs de las imágenes aquí (una por línea)"
            ></textarea>
            <button onClick={handleAddImages}>Agregar imágenes</button>
          </div>
          <div className={styles.containerButtons}>
            <button onClick={() => setOpenImagesModal(false)}>Confirmar</button>
            <button onClick={() => setOpenImagesModal(false)}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateImagesModal;
