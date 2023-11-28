import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Detail from "./Components/Detail";
import ProductCategory from "./Components/ProductCategory";
import { Route, Routes } from "react-router-dom";
import Admin from "./Admin.jsx";
import List from "./Pages/List";
import AddProduct from "./Pages/AddProduct";
import ProductList from "./Components/ProductList";
import AddCategory from "./Pages/AddCategory.jsx";
import Viento from "./Components/Viento";
import Cuerdas from "./Components/Cuerdas";
import Percusion from "./Components/Percusion";
import Acessorios from "./Components/Accesorios";
import Profile from "./Pages/Profile";
import ListUsers from "./Pages/ListUsers";
// import {  } from "./Pages/";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup.jsx";
import FavList from "./Pages/FavList.jsx";

/*FONT AWESOME */

function App() {
	return (
		<>
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="admin" element={<Admin />} />
				<Route path="/admin/list" element={<List />} />
				<Route path="/admin/addProduct" element={<AddProduct />} />
				<Route path="/admin/addCategory" element={<AddCategory />} />
				{/* <Route path="/admin/caracteristicas" element={<Features />} /> */}
				<Route path="/Detail/:id" element={<Detail />} />
				<Route path="/ProductCategory" element={<ProductCategory />} />
				<Route path="/Cuerdas" element={<Cuerdas />} />
				<Route path="/Percusion" element={<Percusion />} />
				<Route path="/Accesorios" element={<Acessorios />} />
				<Route path="/Viento" element={<Viento />} />
				<Route path="/ListaInstrumentos" element={<ProductList />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registro" element={<Signup />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/admin/listUsers" element={<ListUsers />} />
				<Route path="/favoritos" element={<FavList />}/>
			</Routes>

			<Footer />
		</>
	);
}

export default App;
