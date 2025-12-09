import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home.tsx";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<AppLayout />}>
				<Route index element={<Home />} />
			</Route>

			<Route path="*" element={<h1>404</h1>} />
		</Routes>
	);
}
