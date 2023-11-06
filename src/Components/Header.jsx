import React from "react";
import { Link } from "react-router-dom";
import style from "./Styles/Header.module.css";


const Header = () => {
	return (

			<div className={style.header}>
				<div className={style.div}>

						<Link to="/">
							<img className= {style.logo} src="./img/logo.png" alt="logo dh" />
						</Link>

					<h1>Sinfonía</h1>
				</div>

				<div className={style.buttons}>
					<button>Crear cuenta</button>
					<button>Iniciar sesion</button>
				</div>
			</div>

	);
};

export default Header;
