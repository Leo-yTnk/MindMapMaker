import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<Home />} />
				</Route>

				{/* 404 */}
				<Route path="*" element={<h1>404</h1>} />

			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
