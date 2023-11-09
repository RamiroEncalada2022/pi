import React, { useContext } from 'react';
import { useContextGlobal } from '../Components/utils/global.context'
import axios from 'axios';
import styles from './Style/List.module.css'
import { Link } from 'react-router-dom';

const Features = () => {
    const { state, dispatch } = useContextGlobal(); // Uso del contexto

    const handleDelete = async (id) => {
        if (window.confirm('¿Confirma que desea eliminar esta caracteristica?')) {
            try {
                await axios.delete(`http://localhost:8080/producto/eliminar/${id}`);
                dispatch({ type: 'DELETE_CARACTERISTICA', payload: id }); // Actualizar el estado mediante el contexto con instrumentos2
            } catch (error) {
                console.error('Error al eliminar la característica:', error);
            }
        }
    };

    return (
        <div>

            <div className={styles.effectGlass}>
                <div className={styles.tableContainer}>
                    <div className={styles.cabecera}>
                        <h2 className={styles.subtitulo}>Lista de caracteristicas</h2>
                        <Link to="/admin" className={styles.backButton}>
                            Volver
                        </Link>
                    </div>
                    <div className={`${styles.tableRow} ${styles.header}`}>
                        <div className={styles.tableColumnId}>ID</div>
                        <div className={styles.tableColumnName}>Nombre</div>
                        <div className={styles.tableColumnActions}>Acciones</div>

                    </div>
                    {state.instrumentos2.map((item) => (
                        <div className={styles.tableRow} key={item.id}>

                            <div className={styles.tableColumnId}>{item.id}</div>
                            <div className={styles.tableColumnName}>{item.nombre}</div>
                            <div className={styles.tableColumnActions}>
                                <button className={styles.deleteButton} onClick={() => handleUpdate(item.id)}>
                                    Editar
                                </button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className={styles.deleteButton} onClick={() => handleAdd(item.id)}>
                    Agregar nueva
                </button>


            </div>



        </div>
    );
};

export default Features;