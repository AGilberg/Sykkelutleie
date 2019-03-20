import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar } from '../widgets';
import { handlekurv } from '../index.js';
import { NavLink } from 'react-router-dom';

class Handlekurv extends Component {
  render() {
    return (
      <div className="main">
        {/* Viser hva som er valgt til bestillingen */}
        <div>
          <h1>Handlekurv</h1>
        </div>
        <div className="container-fluid">
          <div className="row" style={{ backgroundColor: 'lavender', fontWeight: 'bold' }}>
            <div className="col">Nr.</div>
            <div className="col">Produktnavn</div>
            <div className="col">Antall</div>
            <div className="col">Pris</div>
            <div className="col" />
          </div>
          {handlekurv.map((prod, index) => (
            <div key={index} className="row" style={index % 2 != 0 ? { backgroundColor: 'lavender' } : {}}>
              <div className="col">{index + 1}</div>
              <div className="col">{prod.navn}</div>
              <div className="col">{prod.antall}</div>
              <div className="col">{prod.pris}</div>
              <div className="col">
                <button>Slett</button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <NavBar.Link to="/utsjekk">
          <button className="btn btn-success" id="utsjekk">
            Utsjekk
          </button>
        </NavBar.Link>
      </div>
    );
  }
}

export { Handlekurv };
