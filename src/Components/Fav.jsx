import { useContextGlobal } from "./utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {} from "./Styles/Fav.css";

const Fav = (instrumento) => {
	const { dispatch } = useContextGlobal();

	const toggleFav = () => {
		dispatch({ type: "TOGGLE_FAV", payload: instrumento });
	};
	// console.log(favs);

	return (
		<div className="fav">
			{/* <FontAwesomeIcon icon={regular("heart")} /> */}

			<FontAwesomeIcon icon={faHeart} onClick={toggleFav} />
		</div>
	);
};

export default Fav;
