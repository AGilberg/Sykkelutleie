import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { AktiveBestillinger } from './components/aktiveBestillinger.js';
import { Leieperiode } from './components/leieperiode.js';
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
import Iframe from 'react-iframe';
import { cartService } from './services/CartService';
import confirmBox from './services/confirmBox';
import varsel from './services/notifications.js';
import Login from './components/login';
import { loginService } from './services/LoginService';

import createHashHistory from 'history/createHashHistory';
export const history = createHashHistory();

class Menu extends Component {
  // mounted(){// FIXME: legg til for å bruke innloggingen og utlogging, IKKE FJERN
  //   if(!cartService.getIsLoggedInn()){
  //    document.getElementById("loginCover").classList.remove('js-hidden');
  //     history.push('/login');
  //   }
  // }

  render() {
    return (
      <div
        className="col bg-light"
        style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }}
      >
        <div id="loginCover" className="js-cover js-hidden" />
        <NavBar
          brand=<img
            src="images/sykkelutleie.jpg"
            onClick={() => history.push('/')}
            alt="logo"
            style={{ width: '256.4px', height: '70px' }}
          />
        >
          <NavBar.Link to="/aktivebestillinger">Alle bestillinger</NavBar.Link>

          <div
            style={{
              color: 'rgba(0, 0, 0, 0.5)',
              fontSize: '18px',
              marginTop: '5px',
              position: 'absolute',
              right: '10px',
              padding: '8px',
              paddingBottom: '12px',
              fontWeight: 'bold'
            }}
          >
            <Button.Info onClick={loginService.logout}>Logg ut</Button.Info>
          </div>
        </NavBar>
      </div>
    );
  }
}

class Home extends Component {
  constructor() {
    super();
    this.state = {
      useURL: ''
    };
    this.trondelagURL = 'https://www.yr.no/sted/Norge/Tr%c3%b8ndelag/Trondheim/Trondheim/ekstern_boks_tre_dager.html';
    this.isbjornURL = 'https://www.yr.no/sted/Norge/Svalbard/Isbj%c3%b8rnhamna/ekstern_boks_tre_dager.html';
    this.osloURL = 'https://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/ekstern_boks_tre_dager.html';
  }

  mounted() {
    this.setState({ useURL: this.isbjornURL }); // FIXME: hent inn URL utenfra, bør egentlig ligge i DB sammen med avdeling elns
  }

  render() {
    return (
      <div className="main">
        <Card>
          <div className="col-md-4">
            <h4>Hovedside </h4>
          </div>
          <div style={{ margin: '50px' }}>
            <h5>Værmelding:</h5>
            <Row>
              <div id="here" className="vaermelding brBottom">
                <Iframe height="195px" width="100%" url={this.state.useURL} sandbox="allow-scripts" />
                <div className="coverWeather" />
              </div>
            </Row>
            <h5>Årets ansatt: Rikard Gjelsvik </h5>
            <Row>
              <div className="col-md-4">
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
              <div className="col-md-8">
                <b>Om meg:</b>
                <p>
                  {' '}
                  Jeg er 22 år gammel og kommer fra Sandnes, Rogaland. Nå bor jeg i Trondheim sammen med min forlovede,
                  som i likhet med meg studerer ved NTNU. Noen av interessene mine er friluftsliv, diverse håndverk, å
                  spille eufonium og brettspill. Bildet av meg er fra en langtur i sommer, da jeg kom meg opp på
                  Hardangervidda. Det skal også nevnes at jeg er et kaffe-menneske – selv om jeg greier meg fint uten er
                  det alltid godt med. Før jeg begynte på studiene mine gjennomførte jeg førstegangstjenesten i
                  Forsvaret. Det var en lærerik prosess som jeg har hatt mye igjen for, spesielt med tanke på min
                  interesse for friluftsliv. Videre tok jeg opp fag fra videregående skole som privatist her i
                  Trondheim. Blant fagene var IT-1 og IT-2 som begge var med på å gi meg en økt interesse for IT-faget.
                  Etter et halvt år på linjen “Matteknologi” ved NTNU, bestemte jeg meg for å søke et mer data-relatert
                  studium. Dette førte til at jeg nå er førsteårsstudent på studiet "Informatikk: Drift av datasystem".
                  I fremtiden kunne jeg tenkt meg å nytte kompetansen min til å løse sikkerhetsrelaterte problemer i
                  IT-verdenen.
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
          <Button.Success onClick={this.bestill}>Ny bestilling</Button.Success>
        </NavBar.Link>
        <NavBar.Link to="/leieperiode">Leieperiode</NavBar.Link>
        <NavBar.Link to="/kunde">Kunde</NavBar.Link>
        <NavBar.Link to="/sykkel">Sykkel</NavBar.Link>
        <NavBar.Link to="/ekstrautstyr">Ekstrautstyr</NavBar.Link>
        <NavBar.Link to="/handlekurv">Handlekurv</NavBar.Link>
      </div>
    );
  }
  bestill() {
    if (cartService.kunde == null && cartService.startdato == null && cartService.handlekurv.length == 0) {
      history.push('/leieperiode');
    } else {
      confirmBox('Varsel', 'Ønsker du å starte en ny bestilling?', res => {
        if (res == 1) {
          cartService.dropOrder();
          varsel('Suksess!', 'Du startet en ny bestilling', 'vrsl-success');
        }
      });
    }
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
          <Route exact path="/login" component={Login} />
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
