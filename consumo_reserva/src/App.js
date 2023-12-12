import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ReservasSalaGrupo from './components/ReservasSalaGrupo';
import NovaReservaKindle from './components/NovaReservaKindle';
import ReservasKindle from './components/ReservasKindle';
import NovaReservaSala from './components/NovaReservaSala';
import ReservaEspecifica from './components/ReservaEspecifica';


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Biblioteca - Sistema de Reservas</h1>
          <nav>
            <ul>
              <li>
                <Link to="/nova-reserva-kindle">Nova Reserva Kindle</Link>
              </li>
              <li>
                <Link to="/reservas-kindle">Reservas Kindle</Link>
              </li>
              <li>
                <Link to="/nova-reserva-sala">Nova Reserva de Sala</Link>
              </li>
              <li>
                <Link to="/reservas-sala-grupo">Reservas de Sala</Link>
              </li>
              <li>
                <Link to="/reserva-especifica/:tipo/:id">Reserva Específica</Link>
              </li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route exact path="/nova-reserva-kindle" component={NovaReservaKindle} />
          <Route exact path="/reservas-kindle" component={ReservasKindle} />
          <Route exact path="/nova-reserva-sala" component={NovaReservaSala} />
          <Route exact path="/reservas-sala-grupo" component={ReservasSalaGrupo} />
          <Route exact path="/reserva-especifica/:tipo/:id" component={ReservaEspecifica} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
