import { Outlet, Link } from "react-router-dom";

const icons = {
    add: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path
                fillRule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
        </svg>
    ),
    home: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>
    ),
    book: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-journal-bookmark-fill"
            viewBox="0 0 16 16"
        >
            <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
        </svg>
    ),
};

const navigationLinks = [
    { to: "/", label: "Home", icon: icons.home },
    { to: "/library", label: "Biblioteca", icon: icons.book },
];

export default function AppLayout() {
    return (
        <>
            <nav>
                <button className="active">
                    {icons.add}
                    <span>Novo</span>
                </button>

                <span className="separator"></span>

                <div>
                    {navigationLinks.map((link) => (
                        <Link key={link.to} to={link.to} className="btn">
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            <main>
                <Outlet />
            </main>
        </>
    );
}
