import React from "react";
import style from "./Styles/ModalGalery.css?inline";

const ModalGalery = ({ isOpen, closeModal }) => {
	if (!isOpen) return null;
	return (
		<div className="modal">
			<img src="/img/cuerda.jpg" className="modal-content"></img>
			<button color="#000" onClick={closeModal}>
				Cerrar galería
			</button>
		</div>
	);
};

export default ModalGalery;
