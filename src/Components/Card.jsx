import { Link } from "react-router-dom";
import { useContextGlobal } from "./utils/global.context";
import style from "./Styles/Card.module.css";
import Fav from "./Fav";

const Card = ({ instrumento }) => {
	const { state } = useContextGlobal();
	// const toggleFav = () => {
	// 	dispatch({ type: "TOGGLE_FAV", payload: instrumento });
	// };

  const {state, dispatch} = useContextGlobal()
  console.log("Imagenes" + instrumento.imagenes)

  console.log("La imagen: " +instrumento.imagenes[0])
	return (
		<div className={style.card}>
			<Fav instrumento={instrumento} />
			{/* <button onClick={toggleFav} className="favButton">
				⭐
			</button> */}
			<img src={instrumento.imagenes[0]} alt="instrumento" width={"50px"} />

			<Link to={`/Detail/${instrumento.id}`}>
				<h2 className={style.tituloCard}>{instrumento.nombre}</h2>
			</Link>
		</div>
	);
};

export default Card;
