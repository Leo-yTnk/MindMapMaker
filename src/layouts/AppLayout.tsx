import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                
                <button>+ Criar</button>
            </nav>

            <Outlet />
        </>
    );
}
