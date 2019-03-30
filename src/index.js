import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { AktiveBestillinger } from './components/aktiveBestillinger.js';
import { Leieperiode } from './components/Leieperiode.js';
import { BestillingDetails } from './components/bestillingDetails.js';
import { BestillingEdit } from './components/editBestilling.js';
import { Ekstrautstyr } from './components/ekstrautstyr.js';
import { Handlekurv } from './components/handlekurv.js';
import { Kunde } from './components/kunde.js';
import { Kundesøk } from './components/kundesok.js';
import { ProduktSykkel } from './components/produktSykkel.js';
import { ProduktUtstyr } from './components/produktUtstyr.js';
import { RegistrerKunde } from './components/registrerKunde.js';
import { Sykkel } from './components/sykkel.js';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import Iframe from 'react-iframe'

import createHashHistory from 'history/createHashHistory';
export const history = createHashHistory();

class Menu extends Component {
  render() {
    return (
      <div
        className="col bg-light"
        style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }}
      >
        <NavBar
          brand=<img
            src="images/sykkelutleie.jpg"
            onClick={() => history.push('/')}
            alt="logo"
            style={{ width: '256.4px', height: '70px' }}
          />
        >
          <NavBar.Link to="/aktivebestillinger">Aktive bestillinger</NavBar.Link>
          <div className="js-hidden" id="varsler" />
        </NavBar>
      </div>
    );
  }
  varsel(msg) {
    let varsel = document.getElementById('varsler');
    varsel.classList.remove('js-hidden');
    varsel.innerHTML = msg;

    setTimeout(function() {
      varsel.innerHTML = '';
      varsel.classList.add('js-hidden');
    }, 5000);
  }
}

class Home extends Component {
  constructor(){
    super();
    this.state = {
      useURL: ""
    }
      this.trondelagURL = "https://www.yr.no/sted/Norge/Tr%c3%b8ndelag/Trondheim/Trondheim/ekstern_boks_tre_dager.html";
      this.isbjornURL = "https://www.yr.no/sted/Norge/Svalbard/Isbj%c3%b8rnhamna/ekstern_boks_tre_dager.html";
      this.osloURL  = "https://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/ekstern_boks_tre_dager.html";
  }

  mounted(){
    this.setState({useURL: this.isbjornURL});// FIXME: hent inn URL utenfra, bør egentlig ligge i DB sammen med avdeling elns
  }

  render() {
    return (
      <div className="main">
        <Card title="Hovedside">
          <div style={{ margin: '50px' }}>
            <h5>Værmelding:</h5>
            <Row>
              <div id="here"className="vaermelding brBottom" >
                <Iframe height="195px" width="100%" url={this.state.useURL} sandbox=" "/>
                <div className="coverWeather"></div>
              </div>
            </Row>
            <h5>Årets ansatt: </h5>
            <Row>
              <div className="col-md-5">
                <img
                  className="shadow"
                  style={{
                    width: '200px',
                    height: '250px',
                    opacity: '1.0'
                  }}
                  src="images/aaretsAnsatt.jpg"
                />
              </div>
              <div className="col-md-5">
                <b>Om meg:</b>
                <p>
                  {' '}
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                </p>{' '}
              </div>
            </Row>
          </div>
        </Card>
      </div>
    );
  }
}

//activeStyle funk ikkje
class Sidenav extends Component {
  render() {
    return (
      <div className="col-md-2">
        <NavBar.Link className="link" to="/leieperiode">
          Leieperiode
        </NavBar.Link>
        <NavBar.Link className="link" to="/kunde">
          Kunde
        </NavBar.Link>
        <NavBar.Link className="link" to="/sykkel">
          Sykkel
        </NavBar.Link>
        <NavBar.Link className="link" to="/ekstrautstyr">
          Ekstrautstyr
        </NavBar.Link>
        <NavBar.Link className="link" to="/handlekurv">
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
        <div className="col-md-10" style={{ overflowY: 'scroll', borderTop: '1px solid #c9dbdb' }}>
          <Route exact path="/" component={Home} />
          <Route exact path="/aktivebestillinger" component={AktiveBestillinger} />
          <Route exact path="/aktivebestillinger/:bestilling_id" component={BestillingDetails} />
          <Route exact path="/aktivebestillinger/:bestilling_id/edit" component={BestillingEdit} />
          <Route exact path="/leieperiode" component={Leieperiode} />
          <Route exact path="/kunde" component={Kunde} />
          <Route exact path="/kundesøk" component={Kundesøk} />
          <Route exact path="/registrerKunde" component={RegistrerKunde} />
          <Route exact path="/sykkel" component={Sykkel} />
          <Route exact path="/sykkel/:id" component={ProduktSykkel} />
          <Route exact path="/ekstrautstyr" component={Ekstrautstyr} />
          <Route exact path="/ekstrautstyr/:id" component={ProduktUtstyr} />
          <Route exact path="/handlekurv" component={Handlekurv} />
        </div>
      </div>
    </div>
  </HashRouter>,
  document.getElementById('root')
);

export let varsel = new Menu();
