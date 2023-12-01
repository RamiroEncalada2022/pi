import { useContextGlobal } from "./utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { } from "./Styles/Fav.css";

const Fav = ({ instrumento }) => {
	const { dispatch, state } = useContextGlobal();

	const findFav = state.favs.find(fav => fav.id === instrumento.id)

	const toggleFav = () => {

		dispatch({ type: "TOGGLE_FAV", payload: { instrumento } });
	};

	return (
		<div className="fav">
			{state.loggedIn ? (
				<FontAwesomeIcon icon={findFav ? solidHeart : regularHeart}
					onClick={toggleFav} />
			) : null}
			{/* // <FontAwesomeIcon icon="fa-solid fa-heart" onClick={toggleFav} /> */}
		</div>
	);
};

export default Fav;


