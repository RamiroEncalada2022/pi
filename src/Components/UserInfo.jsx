import React from "react";
import { useContextGlobal } from "./utils/global.context";
import style from "./Styles/UserInfo.module.css";
import { Link } from "react-router-dom";

const UserInfo = () => {
	const { state, dispatch } = useContextGlobal();

	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
		localStorage.removeItem("user");
	};

	if (state.loggedIn) {
		const initials =
			(state.user.name && state.user.name.charAt(0)) +
			(state.user.surname && state.user.surname.charAt(0));

		return (
			<div className={style.userContainer}>
				<div className={style.top}>
					<div className={style.avatar}>{initials}</div>
					<div className={style.userName}>
						{state.user.name} {state.user.surname}
					</div>
				</div>
				<div className={style.links}>
					<div className={style.link}>
						<Link to="/profile" className={style.miniButton}>
							Perfil
						</Link>
					</div>
					<div className={style.link}>
						<Link to="/favoritos" className={style.miniButton}>
							Favoritos
						</Link>
					</div>
					<div className={style.link}>
						<Link to="/misreservas" className={style.miniButton}>
							Reservas
						</Link>
					</div>

					<div className={style.link}>
						{state.user.rol === "ADMIN" && (
							<Link to="/admin" className={style.miniButton}>
								Panel Admin
							</Link>
						)}
					</div>
					<div className={style.link}>
						<span onClick={handleLogout} className={style.miniButton}>
							Cerrar sesión
						</span>
					</div>
				</div>
			</div>
		);
	} else {
		return null;
	}
};

export default UserInfo;
