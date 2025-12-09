import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/sobre">Sobre</Link>
                <Link to="/contato">Contato</Link>
            </nav>

            <Outlet />
        </>
    );
}
