import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Pick from "./components/Pick";
import AdminLogin from "./components/AdminLogin";
import ModeratorLogin from "./components/ModeratorLogin";
import Home from "./components/Home";


function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Pick />} />
					<Route exact path="/api/" element={<Pick />} />
          <Route exact path="/adminLogin" element={<AdminLogin />} />
					<Route exact path="/moderatorLogin" element={<ModeratorLogin />} />
					<Route exact path="/user" element={<Home />} />

				</Routes>
			</Router>
		</div>
	);
}

export default App;