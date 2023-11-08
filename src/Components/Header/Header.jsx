import { Link } from "react-router-dom";
import style from "./Header.module.css";
import { useContextGlobal } from "../utils/global.context";
import UserInfo from "../UserInfo/UserInfo";

const Header = () => {
	const { state } = useContextGlobal();

	return (
		<div className={style.header}>
			<div className={style.div}>
				<Link to="/">
					<img className={style.logo} src="./img/logo.png" alt="logo dh" />
				</Link>
				<h1>Sinfonía</h1>
			</div>

			<div className={style.buttons}>
				{state.loggedIn ? null : (
					<Link to="/registrar">
						<button>Crear cuenta</button>
					</Link>
				)}
				{state.loggedIn ? null : (
					<Link to="/login">
						<button>Iniciar sesión</button>
					</Link>
				)}
			</div>
			<div>{state.loggedIn ? <UserInfo /> : null}</div>
		</div>
	);
};

export default Header;
