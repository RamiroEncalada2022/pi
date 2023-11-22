import { useState } from "react";
import { useContextGlobal } from "./utils/global.context";
import Card from "./Card";
import Pagination from "./Pagination";
import style from "./Styles/ProductCategory.module.css";

const ProductCategory = () => {
	const { state } = useContextGlobal();
	const [productsPerPage, setProductsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const totalProducts = state.instrumentos2.length;

	const lastIndex = currentPage * productsPerPage;
	const firstIndex = lastIndex - productsPerPage;

	const [selectedCheckboxes, setSelectedCheckboxes] = useState([]); // Almacena los valores de los checkboxes seleccionados

	const checkboxStyle = {
		backgroundColor: "#252323", // Cambia este color al que tienes en tu CSS
	};
	// Función para manejar cambios en el checkbox
	const handleCheckboxChange = (event) => {
		const { value, checked } = event.target;

		if (checked) {
			setSelectedCheckboxes([...selectedCheckboxes, value]);
		} else {
			setSelectedCheckboxes(
				selectedCheckboxes.filter((val) => val !== value)
			);
		}
	};

	// Filtrar elementos según los IDs seleccionados en el checkbox
	const filteredInstrumentos = state.instrumentos2.filter((instrumento) =>
		selectedCheckboxes.some((val) =>
			val.split(",").includes(String(instrumento.id))
		)
	);

	return (
		<div className={style.container}>
			{/* Renderizar los checkboxes */}
			<div className={style.checkboxes}>
				<label
					style={
						selectedCheckboxes.includes("1,4,5")
							? { backgroundColor: "#6284AB" }
							: checkboxStyle
					}
				>
					<input
						type="checkbox"
						value="1,4,5"
						onChange={handleCheckboxChange}
					/>
					Guitarras
				</label>

				<label
					style={
						selectedCheckboxes.includes("9,8")
							? { backgroundColor: "#6284AB" }
							: checkboxStyle
					}
				>
					<input
						type="checkbox"
						value="9,8"
						onChange={handleCheckboxChange}
					/>
					Pianos
				</label>

				<label
					style={
						selectedCheckboxes.includes("2")
							? { backgroundColor: "#6284AB" }
							: checkboxStyle
					}
				>
					<input
						type="checkbox"
						value="2"
						onChange={handleCheckboxChange}
					/>
					Microfonos
				</label>

				<label
					style={
						selectedCheckboxes.includes("3")
							? { backgroundColor: "#6284AB" }
							: checkboxStyle
					}
				>
					<input
						type="checkbox"
						value="3"
						onChange={handleCheckboxChange}
					/>
					Baterías y Percusion
				</label>

				<label
					style={
						selectedCheckboxes.includes("6,7")
							? { backgroundColor: "#6284AB" }
							: checkboxStyle
					}
				>
					<input
						type="checkbox"
						value="6,7"
						onChange={handleCheckboxChange}
					/>
					Accesorios
				</label>
			</div>

			<div className={style.containerCards}>
				{/* Utilizar los elementos filtrados en lugar de state.instrumentos2 */}
				{filteredInstrumentos
					.slice(firstIndex, lastIndex)
					.map((instrumento) => (
						<Card key={instrumento.id} instrumento={instrumento} />
					))}
			</div>

			<Pagination
				productsPerPage={productsPerPage}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalProducts={totalProducts}
			/>
		</div>
	);
};

export default ProductCategory;
