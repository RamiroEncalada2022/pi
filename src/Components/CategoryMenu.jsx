
import styles from '../Pages/Style/AddProduct.module.css';
import { useContextGlobal } from './utils/global.context.jsx';



const CategoriaMenu = ({ handleProductCategoryChange }) => {
  
  const { state } = useContextGlobal();
  console.log(state)
 
  const categorias = state.categorias
  console.log(categorias)



  return (

    <div>

      <select name="categorias" className={styles.text} onChange={handleProductCategoryChange}>
        <option value="">Selecciona una Categoria</option>

        {categorias.map(categoria => (

          <option key={categoria.id} value={categoria.id}>
            {categoria.titulo}
          </option>

        ))}

        <option value="agregar">Agregue una categoría</option>

        
      </select>

      

    </div>









  );


};








export default CategoriaMenu;









