import { useEffect, useState } from 'react';
import styles from './Styles/CaracteristicasSelector.module.css'; // Importa tus estilos CSS aquí

const CaracteristicasSelector = ({ caracteristicas, onChange }) => {
  const initialSelected = []; // Inicialización vacía de características seleccionadas
  const [selectedCaracteristicas, setSelectedCaracteristicas] = useState(initialSelected);

  useEffect(() => {
    onChange(selectedCaracteristicas); // Llama a la función onChange cuando cambian las características seleccionadas
  }, [selectedCaracteristicas, onChange]);

  const handleCaracteristicaChange = (e) => {
    const { value } = e.target;
    const caracteristicaId = parseInt(value, 10); // Convierte el valor a número base 10
  
    const updatedCaracteristicas = selectedCaracteristicas.includes(caracteristicaId)
      ? selectedCaracteristicas.filter((caracteristicaId) => caracteristicaId !== caracteristicaId)
      : [...selectedCaracteristicas, caracteristicaId];
    console.log(updatedCaracteristicas)
    setSelectedCaracteristicas(updatedCaracteristicas);
  };

  return (
    <div className={styles.caracteristicasContainer}>
      <h4 className={styles.title}>Selecciona las características:</h4>
      {caracteristicas.map((caracteristica) => (
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
