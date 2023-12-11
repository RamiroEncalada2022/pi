import style from "./Styles/ModalGalery.css";
import { useState } from "react";
import { useEffect } from "react";

const ModalGalery = ({ instrumento }) => {
	const [modal, setModal] = useState(false);
	console.log(modal);
	const toggleModal = () => {
		setModal(!modal);
	};

	useEffect(() => {
		if (modal) {
			document.body.classList.add("active-modal");
		} else {
			document.body.classList.remove("active-modal");
		}

		// Limpia la clase cuando el componente se desmonta
		return () => {
			document.body.classList.remove("active-modal");
		};
	}, [modal]);

	return (
		<>
			<button onClick={toggleModal} className="btn-modal">
				Ver más
			</button>
			{modal && (
				<div className={style.contenedorModal}>
					<div onClick={toggleModal} className="overlay"></div>
					<div className="modal-content">
						<div className="slider">
							<img
								src={instrumento.imagenes[0].url}
								alt="instrumento"
								width={"250px"}
							/>
							<img
								src={instrumento.imagenes[1].url}
								alt="instrumento"
								width={"250px"}
							/>
							<img
								src={instrumento.imagenes[2].url}
								alt="instrumento"
								width={"250px"}
							/>
						</div>

						<button className="close-modal" onClick={toggleModal}>
							CERRAR
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ModalGalery;
