import React, { useState } from 'react';
import styles from './Styles/CaracteristicasSelector.module.css';
import { useContextGlobal } from './utils/global.context';

const CaracteristicasSelector = ({ onChange }) => {
  const { state } = useContextGlobal();
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState([]);

  const handleCaracteristicaChange = (e) => {
    const { value } = e.target;
    const caracteristicaId = parseInt(value, 10);

    const updatedCaracteristicas = selectedCaracteristicas.includes(caracteristicaId)
      ? selectedCaracteristicas.filter((id) => id !== caracteristicaId)
      : [...selectedCaracteristicas, caracteristicaId];

    setSelectedCaracteristicas(updatedCaracteristicas);
    onChange(updatedCaracteristicas);
  };

  return (
    <div className={styles.caracteristicasContainer}>
      <h4 className={styles.title}>Selecciona las características:</h4>
      {state.caracteristicas.map((caracteristica) => (
        <div key={caracteristica.id} className={styles.caracteristicaItem}>
          <label>
            <input
              type="checkbox"
              value={caracteristica.id}
              checked={selectedCaracteristicas.includes(caracteristica.id)}
              onChange={handleCaracteristicaChange}
            />
            {caracteristica.nombre}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CaracteristicasSelector;
