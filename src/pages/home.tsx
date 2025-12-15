import "../styles/home.css";
import { create } from "../utils/create.ts";

type HeroAction = {
    iconPath: string;
    secondaryiconPath: string;
    title: string;
    description: string;
    type: Parameters<typeof create>[0];
};

const timeBoundaries = {
    nightEnd: 6,
    morningEnd: 12,
    afternoonEnd: 18,
};

const defaultGreeting = "Olá";
const defaultUsername = "Léo";

const heroActions: HeroAction[] = [
    /* Task */ { 
        iconPath: "M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z", 
        secondaryiconPath: "", 
        title: "Tarefa", 
        description: "Gerencie seus compromissos, provas e trabalhos", 
        type: "task" 
    },
    
    /* Mind Map */ { 
        iconPath: "M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z", 
        secondaryiconPath: "", 
        title: "Mapa Mental", 
        description: "Organize visualmente conceitos", 
        type: "mindmap" },
    /* Flashcards */ { iconPath: "M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z", secondaryiconPath: "M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z", title: "Flashcards", description: "Memorize rapidamente conteúdos", type: "mindmap" },
    /* Quiz */ { iconPath: "M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0", secondaryiconPath: "", title: "Quiz", description: "Teste o entendimento e reforce", type: "mindmap" },
];

function getGreeting(hour: number): string {
    if (hour < timeBoundaries.nightEnd) {
        return "Boa noite";
    }

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
                <section className="card highlight hero">
                    <article className="greetings">
                        <h3>
                            <span className="greeting">{greetingMessage}</span>
                            <span className="user-name">{usernameMessage}</span>
                        </h3>

                        <p>O que você vai fazer hoje?</p>
                    </article>

                    <article className="hero-data">
                        <ul>
                            {heroActions.map((action) => (
                                <li key={action.title}>
                                    <div className="card-div">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                            <path d={action.iconPath}></path>
                                            <path d={action.secondaryiconPath}></path>
                                        </svg>
                                        <h6>{action.title}</h6>
                                        <p>{action.description}</p>
                                        <button className="inverted-active" onClick={() => create(action.type)}>
                                            <span className="icon">+</span>
                                            <span className="label">Criar</span>
                                        </button>
                                    </div>
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
