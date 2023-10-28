import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import style from "./Styles/Header.module.css";


const Header = () => {
	const goToHome = () => {
		window.location.href = '/';
	}

	return (

			<div className={style.header}>
				<div className={style.div}>
					<Link to="/">
						<img className= 'logo' src="./img/LogoSinfonia.png" alt="logo dh"  
						onClick={ goToHome }/>
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
