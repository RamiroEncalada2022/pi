import axios from 'axios';
import React, { useState } from 'react';
import styles from './Style/ListUsers.module.css';
import { useContextGlobal } from '../Components/utils/global.context';
import { Link } from 'react-router-dom';



const AddCategory = () => {
  const { state, dispatch } = useContextGlobal();
  const [newCategory, setNewCategory] = useState({ titulo: '', descripcion: '', urlImagen: '' });
  const [editMode, setEditMode] = useState(false);
  const [editedCategory, setEditedCategory] = useState({ id: null, titulo: '', descripcion: '', urlImagen: '' });

  // Función para agregar una nueva categoría
  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/categorias/registrar', newCategory);
      dispatch({ type: 'ADD_CATEGORIA', payload: response.data });
      setNewCategory({ titulo: '', descripcion: '', urlImagen: '' });
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
    }
  };

  // Función para eliminar una categoría
  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar esta categoría?')) {
      try {
        await axios.delete(`http://localhost:8080/api/categorias/eliminar/${id}`);
        dispatch({ type: 'DELETE_CATEGORIA', payload: id });
      } catch (error) {
        console.error('Error al eliminar la categoría:', error);
      }
    }
  };

  // Función para activar el modo de edición de una categoría
  const handleEdit = (id, titulo, descripcion, urlImagen) => {
    setEditMode(true);
    setEditedCategory({ id, titulo, descripcion, urlImagen });
  };

  // Función para guardar los cambios al editar una categoría
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/categorias/actualizar`, editedCategory);
      dispatch({ type: 'UPDATE_CATEGORIA', payload: editedCategory });
      setEditMode(false);
      setEditedCategory({ id: null, titulo: '', descripcion: '', urlImagen: '' });
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  };

  // Función para cancelar la edición de una categoría
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCategory({ id: null, titulo: '', descripcion: '', urlImagen: '' });
  };

  // Función para manejar los cambios en los inputs al agregar/editar categorías
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editMode) {
      setEditedCategory({ ...editedCategory, [name]: value });
    } else {
      setNewCategory({ ...newCategory, [name]: value });
    }
  };

  return (
    <div className={styles.effectGlass}>
      <div className={styles.container}>
        <h2 className={styles.subtitulo}>Administrar Categoría</h2>
        <input
          className={styles.text}
          type="text"
          name="titulo"
          value={editMode ? editedCategory.titulo : newCategory.titulo}
          onChange={handleInputChange}
          placeholder="Titulo de la categoría"
        />
        <input
          className={styles.text}
          type="text"
          name="descripcion"
          value={editMode ? editedCategory.descripcion : newCategory.descripcion}
          onChange={handleInputChange}
          placeholder="Descripción de la categoría"
        />
        <input
          className={styles.text}
          type="text"
          name="urlImagen"
          value={editMode ? editedCategory.urlImagen : newCategory.urlImagen}
          onChange={handleInputChange}
          placeholder="URL de la imagen"
        />

        <div className={styles.containerButtons}>
          {editMode ? (
            <>
              <button className={styles.button} onClick={handleUpdate}>
                Guardar cambios
              </button>
              <button className={styles.buttonBack} onClick={handleCancelEdit}>
                Cancelar
              </button>
            </>
          ) : (
            <button className={styles.button} onClick={handleAdd}>
              Agregar categoría
            </button>
          )}

          <Link to="/admin" className={styles.backButton}>
            Volver
          </Link>
        </div>
      </div>
      

      <div className={styles.tableContainer}>
      <h2 className={styles.subtitulo}>Lista de Categorías</h2>
      <div className={`${styles.tableRow} ${styles.header}`}>
        <div className={styles.tableColumnId}>ID</div>
        <div className={styles.tableColumnName}>Titulo</div>
        <div className={styles.tableColumnName}>Descripción</div>
        <div className={styles.tableColumnName}>Imagen</div>
        <div className={styles.tableColumnActions}>Acciones</div>
      </div>

      {state.categorias.map((category) => (
        <div className={styles.tableRow} key={category.id}>
          <div className={styles.tableColumnId}>{category.id}</div>
          <div className={styles.tableColumnName}>{category.titulo}</div>
          <div className={styles.tableColumnName}>{category.descripcion}</div>
          <div className={styles.tableColumnName}>
            <img src={category.urlImagen} alt={category.titulo} style={{ width: '50px', height: '50px' }} />
          </div>
          <div className={styles.tableColumnActions}>
            <button className={styles.deleteButton} onClick={() => handleDelete(category.id)}>
              Eliminar
            </button>
            {/* <button
              className={styles.editButton}
              onClick={() => handleEdit(category.id, category.titulo, category.descripcion, category.urlImagen)}
            >
              Editar
            </button> */}
          </div>
        </div>
      ))}
    </div>
    {editMode && (
      <div className={styles.addNewFeature}>
        <input
          type="text"
          placeholder="Titulo de la categoría"
          name="Titulo"
          value={editedCategory.titulo}
          onChange={(e) => setEditedCategory({ ...editedCategory, titulo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción de la categoría"
          name="descripcion"
          value={editedCategory.descripcion}
          onChange={(e) => setEditedCategory({ ...editedCategory, descripcion: e.target.value })}
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          name="urlImagen"
          value={editedCategory.urlImagen}
          onChange={(e) => setEditedCategory({ ...editedCategory, urlImagen: e.target.value })}
        />
        <button className={styles.addButton} onClick={handleUpdate}>
          Guardar cambios
        </button>
        <button className={styles.cancelButton} onClick={handleCancelEdit}>
          Cancelar
        </button>
      </div>
    )}
    </div>
  );
};

export default AddCategory;
