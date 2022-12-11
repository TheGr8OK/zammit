import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Pick from "./components/Pick";
import AdminLogin from "./components/AdminLogin";
import ModeratorLogin from "./components/ModeratorLogin";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ViewMovies from "./components/ViewMovies";
import ModeratorsList from "./components/Moderators";
import AddMovie from "./components/AddMovie";
import PrivateRoutes from "./utils/PrivateRoutes";


function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route element={<PrivateRoutes />}>
						<Route element={<AddMovie />} path="/addMovie" exact />
						<Route element={<ModeratorsList />} path="/moderators" exact />
					</Route>
					<Route exact path="/" element={<Pick />} />
					<Route exact path="/adminLogin" element={<AdminLogin />} />
					<Route exact path="/moderatorLogin" element={<ModeratorLogin />} />
					<Route exact path="/movies" element={<ViewMovies />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;