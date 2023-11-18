import React, { useContext, useState, useEffect } from 'react';
import { useContextGlobal } from '../Components/utils/global.context';
import axios from 'axios';
import styles from './Style/List.module.css';
import { Link } from 'react-router-dom';

const Features = () => {
    const { state, dispatch } = useContextGlobal();
    const [newFeature, setNewFeature] = useState({ nombre: '', icono: '' });
    const [editMode, setEditMode] = useState(false);
    const [editedFeature, setEditedFeature] = useState({ id: null, nombre: '', icono: '' });

    const handleDelete = async (id) => {
        if (window.confirm('¿Confirma que desea eliminar esta característica?')) {
            try {
                await axios.delete(`http://localhost:8080/api/caracteristicas/eliminar/${id}`);
                dispatch({ type: 'DELETE_CARACTERISTICA', payload: id });
            } catch (error) {
                console.error('Error al eliminar la característica:', error);
            }
        }
    };

    const handleAdd = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/caracteristicas/registrar', newFeature);
            dispatch({ type: 'ADD_CARACTERISTICA', payload: response.data });
            setNewFeature({ nombre: '', icono: '' });
        } catch (error) {
            console.error('Error al agregar la característica:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFeature({ ...newFeature, [name]: value });
    };

    const handleEdit = (id, nombre, icono) => {
        setEditMode(true);
        setEditedFeature({ id, nombre, icono });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:8080/api/caracteristicas/actualizar`, editedFeature);
            // Lógica para actualizar el estado local o realizar una nueva llamada para obtener las características actualizadas
            setEditMode(false);
            setEditedFeature({ id: null, nombre: '', icono: '' });
        } catch (error) {
            console.error('Error al actualizar la característica:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedFeature({ id: null, nombre: '', icono: '' });
    };

    return (
        <div>
            <div className={styles.effectGlass}>
                <div className={styles.tableContainer}>
                    <div className={styles.cabecera}>
                        <h2 className={styles.subtitulo}>Lista de características</h2>
                        <Link to="/admin" className={styles.backButton}>
                            Volver
                        </Link>
                    </div>
                    <div className={`${styles.tableRow} ${styles.header}`}>
                        <div className={styles.tableColumnId}>ID</div>
                        <div className={styles.tableColumnName}>Nombre</div>
                        <div className={styles.tableColumnName}>Icono</div>
                        <div className={styles.tableColumnActions}>Acciones</div>
                    </div>
                    {state.caracteristicas.map((item) => (
                        <div className={styles.tableRow} key={item.id}>
                            <div className={styles.tableColumnId}>{item.id}</div>
                            <div className={styles.tableColumnName}>{item.nombre}</div>
                            <div className={styles.tableColumnName}>
                                <img src={item.icono} alt={item.nombre} style={{ width: '50px', height: '50px' }} />
                            </div>
                            <div className={styles.tableColumnActions}>
                                <button className={styles.deleteButton} onClick={() => handleDelete(item.id)}>
                                    Eliminar
                                </button>
                                <button className={styles.editButton} onClick={() => handleEdit(item.id, item.nombre, item.icono)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {editMode && (
                    <div className={styles.addNewFeature}>
                        <input
                            type="text"
                            placeholder="Nombre de la característica"
                            name="nombre"
                            value={editedFeature.nombre}
                            onChange={(e) => setEditedFeature({ ...editedFeature, nombre: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Ícono de la característica"
                            name="icono"
                            value={editedFeature.icono}
                            onChange={(e) => setEditedFeature({ ...editedFeature, icono: e.target.value })}
                        />
                        <button className={styles.addButton} onClick={handleUpdate}>
                            Guardar cambios
                        </button>
                        <button className={styles.cancelButton} onClick={handleCancelEdit}>
                            Cancelar
                        </button>
                    </div>
                )}

                <div className={styles.addNewFeature}>
                    <input
                        type="text"
                        placeholder="Nombre de la característica"
                        name="nombre"
                        value={newFeature.nombre}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Ícono de la característica"
                        name="icono"
                        value={newFeature.icono}
                        onChange={handleInputChange}
                    />
                    <button className={styles.addButton} onClick={handleAdd}>
                        Agregar nueva
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Features;
