import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Home from "./Pages/Home/Home.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import ProductList from "./Components/ProductList/ProductList.jsx";

import { Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin/Admin.jsx";
import List from "./Pages/List/List.jsx";
import AddProduct from "./Pages/AddProduct/AddProduct.jsx";

import Signup from "./Pages/Signup/Signup.jsx";

import "./App.css";

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
