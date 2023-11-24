import { useEffect, useState } from "react";
import style from "../Components/Styles/Recommendations.module.css"
import Card from "../Components/Card"
import { useContextGlobal } from "../Components/utils/global.context";


const FavList = () => {
	//const [favs, setFavs] = useState([]);

	const {state,dispatch} = useContextGlobal()

	//useEffect(() => {
		// Guardo el array desde el localStorage
	//	const storedFavs = JSON.parse(localStorage.getItem("favs")) || [];
		//setFavs(storedFavs);
	//}, []);

	return (
		<div>
			
			<h1>Tus Favoritos</h1>
			{/*<ul>
				{favs.map((fav, index) => (
					<li key={index}>
						<h4>Id: {fav.id}</h4>
						<h3>Nombre: {fav.nombre}</h3>
					</li>
				))}
				</ul>*/}
			<div className={style.container}>
            <div className={style.containerCards}>
                {state.favs.map((fav, index) =>(
                    <Card key={fav.id}
                        instrumento={fav} />


                ))}
            </div>
			</div>






		</div>
	);
};

export default FavList;



