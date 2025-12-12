import "../styles/home.css"

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

                    <article className="card-div dashboard-data">
                        <h6>
                            <span>Dados Semanais</span>
                        </h6>
                        <ul>
                            <li>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-hourglass-bottom" viewBox="0 0 16 16">
                                        <path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z"/>
                                    </svg>
                                    <p>Estudou por</p>
                                    <h5 id="study-time-data">0 minutos</h5>
                                </div>
                            </li>
                            <li className="separator"></li>
                            <li>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16">
                                        <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                    </svg>
                                    <p>Reviu o conteúdo</p>
                                    <h5 id="reviews-data">0 vezes</h5>
                                </div>
                            </li>
                            <li className="separator"></li>
                            <li>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
                                    </svg>
                                    <p>Criou o total de</p>
                                    <h5 id="study-time">0 conteúdos</h5>
                                </div>
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
  