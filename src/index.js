import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Kunde, RegistrerKunde, Kundesøk, Sykkel, Ekstrautstyr } from './forms.js';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <>
        <NavBar brand="Sykkelutleie AS">
          <NavBar.Link to="/kunde">Kunde</NavBar.Link>
          <NavBar.Link to="/sykkel">Sykkel</NavBar.Link>
          <NavBar.Link to="/ekstrautstyr">Ekstrautstyr</NavBar.Link>
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
      <Route exact path="/kunde" component={Kunde} />
      <Route exact path="/kundesøk" component={Kundesøk} />
      <Route exact path="/registrerKunde" component={RegistrerKunde} />
      <Route exact path="/sykkel" component={Sykkel} />
      <Route exact path="/ekstrautstyr" component={Ekstrautstyr} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
