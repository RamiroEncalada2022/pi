import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Style/List.module.css';

const List = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      /* ----------------------------- Api a modificar ---------------------------- */
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setItems(response.data);
    } catch (error) {
      console.error('Se produjo el error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Confirma que desea eliminar el producto?')) {
      try {

              /* ----------------------------- Api a modificar ---------------------------- */
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

        /* -------------------- Busca y elimina el id de la lista ------------------- */
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
      } catch (error) {
        console.error('Error al eliminar el elemento:', error);
      }
    }
  };

  return (
    <div>
      <h2>Lista de productos</h2>
      <Link to="/admin" className={styles.backButton}>
        Volver
      </Link>
      <div className={styles.tableContainer}>
        <div className={`${styles.tableRow} ${styles.header}`}>
          <div className={styles.tableColumnId}>ID</div>
          <div className={styles.tableColumnName}>Nombre</div>
          <div className={styles.tableColumnActions}>Acciones</div>
        </div>
        {items.map((item) => (
          <div className={styles.tableRow} key={item.id}>
            <div className={styles.tableColumnId}>{item.id}</div>
            <div className={styles.tableColumnName}>{item.title}</div>
            <div className={styles.tableColumnActions}>
              <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
