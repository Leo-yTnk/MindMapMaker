import { Routes, Route, Link } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import Library from "./pages/library";
import "./App.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
            </Route>

            <Route path="/library" element={<AppLayout />}>
                <Route index element={<Library />} />
            </Route>

            <Route
                path="*"
                element={
                    <>
                        <Link to="/">Voltar</Link>
                        <h1>404 Página Não Encontrada</h1>
                        <p>Ops! Esta página não existe ou não foi encontrada.</p>
                    </>
                }
            />
        </Routes>
    );
}
