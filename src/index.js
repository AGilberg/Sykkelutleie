import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { AktiveBestillinger } from './components/aktiveBestillinger.js';
import { BestillingDetails } from './components/bestillingdetails.js';
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
      <>
        <NavBar brand="Sykkelutleie AS">
          <NavBar.Link to="/aktivebestillinger">Aktive bestillinger</NavBar.Link>
          <NavBar.Link to="/kunde">Kunde</NavBar.Link>
          <NavBar.Link to="/sykkel">Sykkel</NavBar.Link>
          <NavBar.Link to="/ekstrautstyr">Ekstrautstyr</NavBar.Link>
          <NavBar.Link to="/handlekurv">Handlekurv</NavBar.Link>
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

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
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
  </HashRouter>,
  document.getElementById('root')
);
