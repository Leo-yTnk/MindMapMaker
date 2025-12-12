import "../styles/home.css";
import { newDraft } from "../utils/newDraft.ts";

type DashboardAction = {
    title: string;
    description: string;
    type: Parameters<typeof newDraft>[0];
};

const timeBoundaries = {
    morningEnd: 12,
    afternoonEnd: 18,
};

const defaultGreeting = "Olá";
const defaultUsername = "TestUser";

const dashboardActions: DashboardAction[] = [
    { title: "Mapa Mental", description: "Ideal para organizar visualmente ideias", type: "mindmap" },
    { title: "Flashcards", description: "Ideal para memorizar rapidamente conteúdos", type: "mindmap" },
    { title: "Quiz", description: "Ideal para testar o entendimento e reforçar", type: "mindmap" },
];

function getGreeting(hour: number): string {
    if (hour < timeBoundaries.morningEnd) {
        return "Bom dia";
    }

    if (hour < timeBoundaries.afternoonEnd) {
        return "Boa tarde";
    }

    return "Boa noite";
}

export default function Home() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const greeting = getGreeting(currentHour);
    const username = defaultUsername;

    const greetingMessage = greeting || defaultGreeting;
    const usernameMessage = username ? `, ${username}!` : "!";

    return (
        <>
            <h1>Página Inicial</h1>
            <div className="content">
                <section className="card highlight dashboard">
                    <article className="greetings">
                        <h3>
                            <span className="greeting">{greetingMessage}</span>
                            <span className="user-name">{usernameMessage}</span>
                        </h3>

                        <p>O que você vai fazer hoje?</p>
                    </article>

                    <article className="dashboard-data">
                        <ul>
                            {dashboardActions.map((action) => (
                                <li key={action.title}>
                                    <button className="card-div" onClick={() => newDraft(action.type)}>
                                        <h6>{action.title}</h6>
                                        <p>{action.description}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </article>
                </section>

                <hr />

                <div className="card">
                    <h3>Lorem</h3>
                    <p>Lorem ipsum</p>
                </div>
            </div>
        </>
    );
}
