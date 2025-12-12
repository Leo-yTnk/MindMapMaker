import "../styles/home.css"
import { newDraft } from "../utils/newDraft.ts"

export default function Home() {
    function getGreeting() {
        const now = new Date();
        const hour = now.getHours();
    
        if (hour < 12) {
            return "Bom dia";
        } else if (hour < 18) {
            return "Boa tarde";
        } else {
            return "Boa noite";
        }
    }
    
    let greeting = getGreeting()
    let username = "TestUser"

    const greetingMsg = greeting || "Olá";
    const usernameMsg = username ? `, ${username}!` : "!";

    return (
        <>
            <h1>Página Inicial</h1>
            <div className="content">
                <section className="card highlight dashboard">
                    <article className="greetings">
                        <h3>
                            <span className="greeting">{greetingMsg}</span>
                            <span className="user-name">{usernameMsg}</span>
                        </h3>

                        <p>O que você vai fazer hoje?</p>
                    </article>

                    <article className="dashboard-data">
                        <ul>
                            <li>
                                <button className="card-div" onClick={() => newDraft('mindmap')}>
                                    <h6>Mapa Mental</h6>
                                    <p>Ideal para organizar visualmente ideias</p>
                                </button>
                            </li>

                            <li>
                                <button className="card-div" onClick={() => newDraft('mindmap')}>
                                    <h6>Flashcards</h6>
                                    <p>Ideal para memorizar rapidamente conteúdos</p>
                                </button>
                            </li>

                            <li>
                                <button className="card-div" onClick={() => newDraft('mindmap')}>
                                    <h6>Quiz</h6>
                                    <p>Ideal para testar o entendimento e reforçar</p>
                                </button>
                            </li>
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
  