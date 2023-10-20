import React from "react";
import { Link } from "react-router-dom";
import style from "./Styles/Header.module.css";

const Header = () => {
	return (

			<div className={style.header}>
				<div className={style.div}>
					<Link to="/pi/src/Pages/Home.jsx">
						<img src="/DH.ico" alt="logo dh" />
					</Link>
					<h1>Odonto</h1>
				</div>

				<div className={style.buttons}>
					<button>Crear cuenta</button>
					<button>Iniciar sesion</button>
				</div>
			</div>

	);
};

export default Header;
