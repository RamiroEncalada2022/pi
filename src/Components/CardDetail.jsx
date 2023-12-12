import React from 'react';
import { useContextGlobal } from './utils/global.context';

const CardDetail = ({ instrumento, defaultImage }) => {
  const { dispatch, state } = useContextGlobal();

  // Verificar si hay imágenes disponibles
  const hasImages = instrumento && instrumento.imagenes && instrumento.imagenes.length > 0;

  return (
    <div>
      {/* Mostrar la imagen por defecto si no hay imágenes */}
      {hasImages ? (
        <img src={instrumento.imagenes[0].url} alt="instrumento" width={'250px'} />
      ) : (
        <img src="https://www.yiwubazaar.com/resources/assets/images/default-product.jpg" alt="imagen por defecto" width={'250px'} />
      )}
    </div>
  );
};

export default CardDetail;
