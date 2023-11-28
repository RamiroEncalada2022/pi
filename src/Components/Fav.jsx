import { useContextGlobal } from "./utils/global.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import {} from "./Styles/Fav.css";
import axios from "axios";

const Fav = ({ instrumento }) => {
	const { dispatch, state } = useContextGlobal();

	const isInstrumentInFavs = state.favs.some(
		(fav) => fav.producto.id === instrumento.id
	);
	console.log("Estos son los favoritos: ) ", state.favs);
	console.log("Este es un instrumento ", instrumento);
	const token = state.user.token;

	const addFav = () => {
		const data = {
			usuario: {
				email: state.user.email,
			},
			producto: {
				id: instrumento.id,
			},
		};

		fetch("http://localhost:8080/api/favoritos/registrar", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error en la solicitud POST");
				}
				return response.json();
			})
			.then((data) => {
				console.log("Solicitud POST exitosa", data);
				// Actualiza el estado
				dispatch({ type: "ADD_FAV", payload: data });
			})
			.catch((error) => {
				console.error(error);
			});

		// console.log(data);
	};
	/*async*/
	const deleteFav = (id) => {
		// try {
		// 	await axios.delete(`http:localhost:8080/favoritos/eliminar/${id}`);
		// 	dispatch({ type: "DELETE_FAV", payload: id });
		// } catch (error) {
		// 	console.error("Error al eliminar de favoritos:", error.message);
		// }
		try {
			fetch(`http://localhost:8080/api/favoritos/eliminar/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error en la solicitud DELETE");
					}
					return response.json();
				})
				.then((data) => {
					console.log("Solicitud DELETE exitosa", data);
					// Actualiza el estado
					dispatch({ type: "DELETE_FAV", payload: id });
					console.log(state.favs);
				});
		} catch (error) {
			console.error("Error al eliminar de favoritos:", error);
		}
	};

	return (
		<div className="fav">
			{state.loggedIn ? (
				isInstrumentInFavs ? (
					<a onClick={() => deleteFav(instrumento.id)}>X</a>
				) : (
					// <FontAwesomeIcon icon={faTimes} onClick={deleteFav} />
					<FontAwesomeIcon icon={faHeart} onClick={addFav} />
				)
			) : null}
		</div>
	);
};

export default Fav;
