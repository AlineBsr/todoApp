import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoApp from "./components/TodoApp";
import Connexion from "./components/Connexion";
import Navbar from "./components/Navbar";
import Register from "./components/Register"
function App() {
  const [user, setUser] = useState();
  const [userLogged, setUserLogged] = useState(true);
  const [isLoading, setIsLoading] = useState();
  const baseUrl = "http://localhost:4000";

  return (
    <div>
      <Navbar user={user} userLogged={userLogged} setUserLogged={setUserLogged}/>     

      <Router>
        <Routes>
        {/* { userLogged === true 
        ? ( */}
          <Route 
            path="/" 
            element={ <TodoApp user={user} baseUrl={baseUrl} setIsLoading={setIsLoading} /> } 
          />
{/*           
        ) : (
          <Route 
            path="/" 
            element={ <Connexion baseUrl={baseUrl + "/users"} /> }
          />
        ) } */}
        
        <Route
          exact path="/register"
          element={ <Register baseUrl={baseUrl + "/users"} />}
        />
        <Route
          exact path="/connexion"
          element={ <Connexion user={user} setUser={setUser} baseUrl={baseUrl + "/users"} /> }
        />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
