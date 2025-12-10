import { Outlet, Link } from "react-router-dom";

export default function AppLayout() {
    return (
        <>
            <nav>
                <div>
                    <Link to="/" className="btn">Home</Link>
                    <Link to="/library" className="btn">Biblioteca</Link>
                </div>
                
                <button className="active">+ Criar</button>
            </nav>

            <main>
                <Outlet />
            </main> 
        </>
    );
}
