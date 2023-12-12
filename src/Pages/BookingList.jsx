import { Link } from "react-router-dom";
import { useContextGlobal } from "../Components/utils/global.context";
import style from "./Style/BookingList.module.css";

const BookingList = () => {
	const { state, dispatch } = useContextGlobal();
	console.log("Reservas: ", state.reservas);
	return (
		<div>
			<h1>Tus reservas</h1>

			<div>
				<div className={style.containerBookingList}>
					{state.reservas.map((reserva, index) => (
						// <Card key={reserva.id} instrumento={reserva.producto} />
						<div className={style.containerBooking} key={index}>
							<h3>{state.reservas[index].id}</h3>
							<h4>{state.reservas[index].productos[0].nombre}</h4>
							<img src={state.reservas[index].productos[0].urlImagen} />
							<h4>
								Fecha de inicio: {state.reservas[index].fechaInicio}
							</h4>
							<h4>Fecha de entrega: {state.reservas[index].fechaFin}</h4>
							<h5>
								Observaciones: {state.reservas[index].observaciones}
							</h5>

							<Link
								to={`/Detail/${state.reservas[index].productos[0].id}`}
								className={style.linkStyle}
							>
								Ver producto
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BookingList;
