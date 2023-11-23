import { useEffect, useState } from "react";

const FavList = () => {
	const [favs, setFavs] = useState([]);

	useEffect(() => {
		// Guardo el array desde el localStorage
		const storedFavs = JSON.parse(localStorage.getItem("favs")) || [];
		setFavs(storedFavs);
	}, []);

	return (
		<div>
			<h1>Tus Favoritos</h1>
			<ul>
				{favs.map((fav, index) => (
					<li key={index}>
						<h4>Id: {fav.id}</h4>
						<h3>Nombre: {fav.nombre}</h3>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FavList;
