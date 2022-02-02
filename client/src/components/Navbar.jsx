export default function Navbar({user, userLogged, setUserLogged}){

    
    return(
        <nav className="navbar navbar-light bg-light p-3">
            <a className="navbar-brand" href="/">
            TodoApp
            </a>
            {/* <a href="/register"></a> */}
            {/* { userLogged === false &&  */}
            <a href="/register">S'enregistrer</a> 
            {/* } */}
            {/* { userLogged === true &&  */}
            <a href="/connexion">Connexion</a> 
            {/* } */}

        </nav>
    );
}