import React from "react";
import {} from "./Styles/ModalGalery.css";
import { useState } from "react";
import { useEffect } from "react";

const ModalGalery = () => {
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
				<div className={`modal ${modal ? "active" : ""}`}>
					<div onClick={toggleModal} className="overlay"></div>
					<div className="modal-content">
						<div className="slider">
							<img src="/img/cuerda.jpg"></img>
							<img src="/img/viento.jpg"></img>
							<img src="/img/percusion.jpg"></img>
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
