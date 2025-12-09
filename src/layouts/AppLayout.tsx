import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <nav>
                <div>
                    <Link to="/" className="btn">Home</Link>
                </div>
                
                <button className="active">+ Criar</button>
            </nav>

            <Outlet />
        </>
    );
}
