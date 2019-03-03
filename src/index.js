import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import RegistrerKunde from './forms.js';


class Home extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home page</NavLink>{' '}
        <NavLink to="/bestilling">Bestilling</NavLink>{' '}
        <NavLink to="/registrerKunde">Registrer kunde</NavLink>{' '}
      </div>
    );
  }
}

class Bestilling extends Component {
  /*
  Skjema for bestilling. Kunden må først registreres i databasen
  (om den ikke allerede er det), for at bestillingen skal kunne utføres.
  */
  render() {
    return (
      <div>

      </div>
    );
  }
}


ReactDOM.render(
  <HashRouter>
    <div>
      <Home />
      <Route exact path="/bestilling" component={Bestilling} />
      <Route exact path="/registrerKunde" component={RegistrerKunde} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
