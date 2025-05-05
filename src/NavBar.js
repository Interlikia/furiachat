import logoFuria from './img/furia_logo.png'
import './App.css';

// Barra de navegação simples para acessar outras funcionalidades
export default function NavBar({logOut}){
    const handleClickLogOut = () =>{logOut()};
    return <nav className="nav">
        <a href="/" className="site-title" ><img src={logoFuria} alt="logo"/></a>
        <ul>
            <li>
                <a href='/jogos'>Jogos</a>
            </li>
            <li>
                <a href='/noticias'>Notícias</a>
            </li>
            <li>
                <a href='/' onClick={handleClickLogOut}>Sair</a>
            </li>
            
        </ul>
    </nav>
}