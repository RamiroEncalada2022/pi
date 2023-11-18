import React, { useContext } from 'react';
import { useContextGlobal } from '../Components/utils/global.context'
import axios from 'axios';
import styles from './Style/ListUsers.module.css'
import { Link } from 'react-router-dom';

const ListUsers = () => {
    const { state, dispatch } = useContextGlobal(); // Uso del contexto






    const promoteUser = async (item) => {
      const token = localStorage.getItem('token');
      if (window.confirm('¿Confirma que desea ascender al usuario?')) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const userDataToUpdate = {
            ...item, 
            role: 'ADMIN',
          };
          const response = await axios.put(
            'http://localhost:8080/api/usuarios/actualizar',
            userDataToUpdate,
            config
          );
          if (response.status === 200) {
            // Llama al reducer con la acción correspondiente
            dispatch({ type: 'PROMOTE_USER', payload: userDataToUpdate });
          }
        } catch (error) {
          console.error('Error al ascender al usuario:', error);
        }
      }
    };
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
                {console.log(item.role)}
                <button className={`${styles.promoteButton} ${item.role === 'ADMIN' ? styles.disableButton : ''} `} onClick={() => promoteUser(item)} disabled={item.role === 'ADMIN'}>
                  Ascender a administrador
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