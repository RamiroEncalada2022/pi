import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Detail from "./Components/Detail";

import { Route, Routes } from "react-router-dom";
import Admin from "./Admin.jsx";
import List from "./Pages/List";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Components/ProductList";
import Signup from "./Pages/Signup";

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="admin" element={<Admin />} />
				<Route path="/admin/list" element={<List />} />
				<Route path="/admin/addProduct" element={<AddProduct />} />
				<Route path="/Detail/:id" element={<Detail />} />
				<Route path="/ListaInstrumentos" element={<ProductList />} />
				<Route path="registrar" element={<Signup />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
