import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, NavBar } from '../widgets';
import { NavLink } from 'react-router-dom';

class Kunde extends Component {
  render() {
    return (
      <div className="main">
        {/* Linker til å legge til/søke opp kunder */}
        <br />
        <Card>
          <NavBar.Link className="link" to="/registrerKunde">
            Registrer kunde
          </NavBar.Link>
        </Card>
        <Card>
          <NavBar.Link to="/kundesøk">Kundesøk</NavBar.Link>
        </Card>
      </div>
    );
  }
}

export { Kunde };
