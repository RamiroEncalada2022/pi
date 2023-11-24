import style from "./Styles/ModalCompartir.module.css";
import { useState } from "react";
import { useEffect } from "react";
import Share from "./Share"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ModalCompartir = ({ instrumento, icon}) => {
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
			  <FontAwesomeIcon icon={icon} onClick={toggleModal} />
      {modal && (
				<div className={style.contenedorModal}>
					<div onClick={toggleModal} className="overlay"></div>
					<div className= {style.modalcontent}>
						<div className= {style.slider}>
							<img
								src={instrumento.imagenes[0].url}
								alt="instrumento"
								width={"250px"}
							/>
						</div>
            <div className= {style.descripcion}>
            <h2>Descripción</h2>
            <h4>{instrumento.descripcion}</h4>
            <Share description={"Mirá este instrumento🎵🎶"}/>
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

export default ModalCompartir