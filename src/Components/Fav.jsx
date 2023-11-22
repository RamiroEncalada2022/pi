import { useContextGlobal } from "./utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {} from "./Styles/Fav.css";

const Fav = ({ instrumento }) => {
	const { dispatch, state } = useContextGlobal();

	const toggleFav = () => {
		dispatch({ type: "TOGGLE_FAV", payload: { instrumento } });
	};

	return (
		<div className="fav">
			{state.loggedIn ? (
				<FontAwesomeIcon icon={faHeart} onClick={toggleFav} />
			) : null}
			{/* // <FontAwesomeIcon icon="fa-solid fa-heart" onClick={toggleFav} /> */}
		</div>
	);
};

export default Fav;
