import { Link } from "react-router-dom";
import style from "./Styles/Header.module.css";
import { useContextGlobal } from "./utils/global.context";
import UserInfo from "./UserInfo";

const Header = () => {
	const { state } = useContextGlobal();
	console.log("Esta logueado? ");
	console.log(state.loggedIn);

	return (
		<div className={style.header}>
			<div className={style.div}>
				<Link to="/">
					<img className={style.logo} src="./img/logo.png" alt="logo dh" />
				</Link>
				{/* <h1>Sinfonía</h1> */}
			</div>

			<div className={style.buttons}>
				{state.loggedIn ? null : (
					<Link to="/registro">
						<button>Crear cuenta</button>
					</Link>
				)}
				{state.loggedIn ? null : (
					<Link to="/login">
						<button>Iniciar sesión</button>
					</Link>
				)}
			</div>
			{state.loggedIn ? <UserInfo /> : <div style={{ display: 'none' }}></div>}
		</div>
	);
};

export default Header;
