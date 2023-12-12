import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Detail from "./Components/Detail";
import ProductCategory from "./Components/ProductCategory";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./Pages/Admin.jsx";
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
import Features from "./Pages/Features"
import Login from "./Pages/Login";
import Signup from "./Pages/Signup.jsx";
import FavList from "./Pages/FavList.jsx";
import { useContextGlobal } from './Components/utils/global.context';
import { useEffect } from "react";
import Reservation from "./Pages/Reservation";
import Whatssap from "./Components/Whatssap.jsx";
import BookingList from "./Pages/BookingList.jsx";

/*FONT AWESOME */

function App() {

	const { state, dispatch } = useContextGlobal(); // Uso del contexto


	useEffect(() => {
		// Cargar información de autenticación desde localStorage

		const storedUserData = localStorage.getItem('user');
	
		// Verificar si hay información almacenada en localStorage
		if (storedUserData) {
		// Convertir la cadena a un objeto usando JSON.parse
		const userData = JSON.parse(storedUserData);
	
		// Hacer algo con la información del usuario, por ejemplo, actualizar el contexto
		dispatch({
			type: 'LOGIN',
			payload: userData,
		});
		} else {
		// No hay información del usuario en localStorage, manejarlo según sea necesario
		console.log('No se encontró información del usuario en localStorage');
		}
	}, [dispatch]);
	return (
		<div className="container-app">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
				{state.loggedIn && state.user.rol === 'ADMIN' ? (
          <>
            <Route path="admin" element={<Admin />} />
              <Route path="admin/list" element={<List />} />
              <Route path="admin/addProduct" element={<AddProduct />} />
              <Route path="admin/addCategory" element={<AddCategory />} />
              <Route path="admin/caracteristicas" element={<Features />} />
              <Route path="admin/listUsers" element={<ListUsers />} />
          </>
        ) : (
			<Route
            path="admin/*"
            element={<Navigate to="/login" />}
          />
        )}

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
				<Route path="/favoritos" element={<FavList />} />
				<Route path="/admin/listUsers" element={<ListUsers />} />
				<Route path="/reservation" element={<Reservation />} />
				<Route path="/MisReservas" element={<BookingList />} />
			</Routes>
			<Whatssap/>

			<Footer />
		</div>
	);
}

export default App;
