import style from './Styles/Recommendations.module.css';
import { useContextGlobal } from './utils/global.context';
import { Link } from 'react-router-dom';
import Card from './Card';

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Recommendations = () => {
  const { state } = useContextGlobal();
  const { instrumentos2, searchText } = state;
  const searched = searchText !== ''; // Verificar si se ha realizado una búsqueda

  const filteredInstrumentos = instrumentos2.filter((instrumento) =>
    removeAccents(instrumento.nombre.toLowerCase()).includes(removeAccents(searchText.toLowerCase()))
  );

  return (
    <div className={style.container}>
      <h2 className={style.subtitulo}>
        {searched ? 'RESULTADOS DE TU BUSQUEDA 🔎 ' : 'PRODUCTOS RECOMENDADOS'}
      </h2>
      <div className={style.containerCards}>
        {filteredInstrumentos.slice(0, 10).map((instrumento) => (
          <Card key={instrumento.id} instrumento={instrumento} />
        ))}
      </div>
      <Link to="/ListaInstrumentos">
        <button className={style.firstButton}>Lista Completa</button>
      </Link>
    </div>
  );
};

export default Recommendations;