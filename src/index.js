import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { AktiveBestillinger, BestillingDetails } from './components/aktiveBestillinger.js';
import { Ekstrautstyr } from './components/ekstrautstyr.js';
import { Handlekurv } from './components/handlekurv.js';
import { Kunde } from './components/kunde.js';
import { Kundesøk } from './components/kundesok.js';
import { ProduktSykkel } from './components/produktSykkel.js';
import { ProduktUtstyr } from './components/produktUtstyr.js';
import { RegistrerKunde } from './components/registrerKunde.js';
import { Sykkel } from './components/sykkel.js';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

export var handlekurv = [
  { id: 2, navn: 'hjelm', antall: 1, pris: 150 },
  { id: 3, navn: 'sykkel', antall: 1, pris: 900 },
  { id: 1, navn: 'vannflaske', antall: 3, pris: 75 },
  { id: 2, navn: 'luftpumpe', antall: 1, pris: 150 }
];

class Menu extends Component {
  render() {
    return (
      <div className="col bg-light">
        <NavBar
          brand=<img
            src="images/sykkelutleie.jpg"
            onClick={() => history.push('/')}
            alt="logo"
            width="256.4px"
            height="70px"
          />
        >
          <NavBar.Link to="/aktivebestillinger">Aktive bestillinger</NavBar.Link>
        </NavBar>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div className="main">
        <Card title="Hjem">Hovedside</Card>
      </div>
    );
  }
}

//activeStyle funk ikkje
class Sidenav extends Component {
  render() {
    return (
      <div className="col-2">
        <NavBar.Link className="emner" activeStyle={{ color: 'white' }} to="/kunde">
          Kunde
        </NavBar.Link>
        <NavBar.Link className="emner" activeStyle={{ color: 'white' }} to="/sykkel">
          Sykkel
        </NavBar.Link>
        <NavBar.Link className="emner" activeStyle={{ color: 'white' }} to="/ekstrautstyr">
          Ekstrautstyr
        </NavBar.Link>
        <NavBar.Link className="emner" activeStyle={{ color: 'white' }} to="/handlekurv">
          Handlekurv
        </NavBar.Link>
      </div>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div
      className="container-fluid"
      style={{ overflow: 'hidden', position: 'fixed', bottom: '0', left: '0', height: '100%' }}
    >
      <div className="row">
        <div className="col-12" style={{ width: '100%', paddingLeft: '0px', paddingRight: '0px' }}>
          <Menu />
        </div>
      </div>

      <div className="row" style={{ height: '100%', paddingBottom: '96px' }}>
        <Sidenav />
        <div class="col-10" style={{ overflowY: 'scroll', borderTop: '1px solid #c9dbdb' }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/aktivebestillinger" component={AktiveBestillinger} />
          <Route exact path="/aktivebestillinger/:bestilling_id" component={BestillingDetails} />
          <Route exact path="/kunde" component={Kunde} />
          <Route exact path="/kundesøk" component={Kundesøk} />
          <Route exact path="/registrerKunde" component={RegistrerKunde} />
          <Route exact path="/sykkel" component={Sykkel} />
          <Route exact path="/ekstrautstyr" component={Ekstrautstyr} />
          <Route exact path="/handlekurv" component={Handlekurv} />
          <Route exact path="/produktutstyr" component={ProduktUtstyr} />
          <Route exact path="/produktsykkel" component={ProduktSykkel} />
        </div>
      </div>
    </div>
  </HashRouter>,
  document.getElementById('root')
);
