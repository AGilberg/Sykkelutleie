import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { AktiveBestillinger, BestillingDetails } from './components/aktiveBestillinger.js';
import { Ekstrautstyr } from './components/ekstrautstyr.js';
import { EkstrautstyrDetails } from './components/ekstrautstyrDetails.js';
import { Handlekurv } from './components/handlekurv.js';
import { Kunde } from './components/kunde.js';
import { Kundesøk } from './components/kundesok.js';
import { ProduktSykkel } from './components/produktSykkel.js';
import { ProduktUtstyr } from './components/produktUtstyr.js';
import { RegistrerKunde } from './components/registrerKunde.js';
import { Sykkel } from './components/sykkel.js';
import { SykkelDetails } from './components/sykkelDetails.js';
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
      <>
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
      </>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Hjem">Hovedside</Card>;
  }
}

class Sidenav extends Component {
  render() {
    return (
      <>
        <div className="sidenav">
          <NavBar.Link className="emner" to="/kunde">
            Kunde
          </NavBar.Link>
          <NavBar.Link className="emner" to="/sykkel">
            Sykkel
          </NavBar.Link>
          <NavBar.Link className="emner" to="/ekstrautstyr">
            Ekstrautstyr
          </NavBar.Link>
          <NavBar.Link className="emner" to="/handlekurv">
            Handlekurv
          </NavBar.Link>
        </div>
      </>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Sidenav />
      <Route exact path="/" component={Home} />
      <Route exact path="/aktivebestillinger" component={AktiveBestillinger} />
      <Route exact path="/aktivebestillinger/:bestilling_id" component={BestillingDetails} />
      <Route exact path="/kunde" component={Kunde} />
      <Route exact path="/kundesøk" component={Kundesøk} />
      <Route exact path="/registrerKunde" component={RegistrerKunde} />
      <Route exact path="/sykkel" component={Sykkel} />
      <Route exact path="sykkel/:klasse_id" component={SykkelDetails} />
      <Route exact path="/ekstrautstyr" component={Ekstrautstyr} />
      <Route exact path="/ekstrautstyr/:utstyr_id" component={EkstrautstyrDetails} />
      <Route exact path="/handlekurv" component={Handlekurv} />
      <Route exact path="/produktutstyr" component={ProduktUtstyr} />
      <Route exact path="/produktsykkel" component={ProduktSykkel} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
