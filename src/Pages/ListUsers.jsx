import React, { useContext } from 'react';
import { useContextGlobal } from '../Components/utils/global.context'
import axios from 'axios';
import styles from './Style/List.module.css'
import { Link } from 'react-router-dom';

const ListUsers = () => {
    const { state, dispatch } = useContextGlobal(); // Uso del contexto

    const handleDelete = async (id) => {
      if (window.confirm('¿Confirma que desea eliminar el usuario?')) {
        try {
          await axios.delete(`http://localhost:8080/producto/eliminar/${id}`);
          dispatch({ type: 'DELETE_INSTRUMENTO', payload: id }); // Actualizar el estado mediante el contexto con instrumentos2
        } catch (error) {
          console.error('Error al eliminar el elemento:', error);
        }
      }
    };
    console.log("Usuarios")
    console.log(state.usuarios)
    return (
      <div>
        
        <div className={styles.effectGlass}>
        <div className={styles.tableContainer}>
        <div className={styles.cabecera}>
          <h2 className={styles.subtitulo}>Lista de usuarios</h2>
          <Link to="/admin" className={styles.backButton}>
            Volver
          </Link>
        </div>
          <div className={`${styles.tableRow} ${styles.header}`}>
            <div className={styles.tableColumnId}>ID</div>
            <div className={styles.tableColumnName}>Nombre</div>
            <div className={styles.tableColumnActions}>Acciones</div>
          </div>
          {state.usuarios.map((item) => (
            <div className={styles.tableRow} key={item.id}>
              <div className={styles.tableColumnId}>{item.id}</div>
              <div className={styles.tableColumnName}>{item.nombre}</div>
              <div className={styles.tableColumnActions}>
                <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    );
  };

export default ListUsers