import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { handlekurv } from './index.js';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import {
  logService,
  bestillingService,
  kundeService,
  sykkelService,
  vareService,
  cartService,
} from './services';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();


class Kunde extends Component {
  render() {
    return (
      <>
        {/* Linker til å legge til/søke opp kunder */}
        <br />
        <Card>
          <NavBar.Link to="/registrerKunde">Registrer kunde</NavBar.Link>
        </Card>
        <Card>
          <NavBar.Link to="/kundesøk">Kundesøk</NavBar.Link>
        </Card>
      </>
    );
  }
}

class RegistrerKunde extends Component {
  kjonn = 1;
  fornavn = '';
  etternavn = '';
  fodt = '';
  mail = '';
  mobil = '';
  adresse = '';
  post_nr = '';
  sted = '';
  kommentar = '';
  tilbud = true;

  render() {
    return (
      <>
        {/*  Skjema for registrering av kunde.*/}
        <div>
          <form className="form-horizontal">
            <fieldset>
              <legend>Registrer kunde</legend>
              {/* Navn */}
              <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="navn">
                  Navn
                </label>
                <div className="col-sm-4">
                  <input
                    id="fornavn"
                    name="fornavn"
                    type="text"
                    placeholder="Fornavn"
                    className="form-control input-md"
                    value={this.fornavn}
                    onChange={event => (this.fornavn = event.target.value)}
                    required
                  />
                  <input
                    id="etternavn"
                    name="etternavn"
                    type="text"
                    placeholder="Etternavn"
                    className="form-control input-md"
                    value={this.etternavn}
                    onChange={event => (this.etternavn = event.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Fødselsdato (annet format på dette, mtp brukervennlighet?)*/}
              <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="fodt">
                  Fødselsdato
                </label>
                <div className="col-sm-4">
                  <input
                    id="fodt"
                    name="fodt"
                    type="date"
                    placeholder="dd.mm.åååå"
                    className="form-control input-md"
                    onChange={event => (this.fodt = event.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Adresse */}
              <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="Adresse">
                  Adresse
                </label>
                <div className="col-sm-4">
                  <input
                    id="adresse"
                    name="adresse"
                    type="text"
                    placeholder="Gateadresse"
                    className="form-control input-md"
                    value={this.adresse}
                    onChange={event => (this.adresse = event.target.value)}
                    required
                  />
                  <input
                    id="post_nr"
                    name="post_nr"
                    type="number"
                    placeholder="Postnummer"
                    className="form-control input-md"
                    value={this.post_nr}
                    onChange={event => (this.post_nr = event.target.value)}
                    required
                  />
                  <input
                    id="sted"
                    name="sted"
                    type="text"
                    placeholder="Poststed"
                    className="form-control input-md"
                    value={this.sted}
                    onChange={event => (this.sted = event.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Epost */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="epost">
                  Epost
                </label>
                <div className="col-md-4">
                  <input
                    id="mail"
                    name="mail"
                    type="email"
                    placeholder="Epost"
                    className="form-control input-md"
                    value={this.mail}
                    onChange={event => (this.mail = event.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Telefon */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="epost">
                  Mobilnummer
                </label>
                <div className="col-md-4">
                  <input
                    id="mobil"
                    name="mobil"
                    type="tel"
                    placeholder="Mobilnummer"
                    className="form-control input-md"
                    value={this.mobil}
                    onChange={event => (this.mobil = event.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Kommentar */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="kommentar">
                  Kommentar
                </label>
                <div className="col-md-4">
                  <input
                    id="kommentar"
                    name="kommentar"
                    type="text"
                    placeholder="Kommentar"
                    className="form-control input-md"
                    value={this.kommentar}
                    onChange={event => (this.kommentar = event.target.value)}
                  />
                </div>
              </div>
              {/* Ønsker reklame. (Må ikke ha med dette) */}
              <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="tilbud">
                  Ønsker å motta tilbud
                </label>
                <div className="col-sm-4">
                  <label className="radio-inline" htmlFor="tilbud-0">
                    <input
                      type="radio"
                      name="tilbud"
                      id="tilbud-0"
                      defaultValue={true}
                      onChange={event => (this.tilbud = event.target.value)}
                      defaultChecked="checked"
                    />
                    Ja
                  </label>
                  <label className="radio-inline" htmlFor="tilbud-1">
                    <input
                      type="radio"
                      name="tilbud"
                      id="tilbud-1"
                      defaultValue={false}
                      onChange={event => (this.tilbud = event.target.value)}
                    />
                    Nei
                  </label>
                </div>
              </div>
              {/* Registreringsknapp */}
              <div className="form-group">
                <label className="col-md-4 control-label" htmlFor="submit" />
                <div className="col-md-4">
                  <Row>
                    <Column>
                      <button id="submit" name="submit" className="btn btn-success" onClick={this.add}>
                        Registrer
                      </button>
                    </Column>
                    <Column right>
                      <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
                        Tilbake
                      </button>
                    </Column>
                  </Row>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </>
    );
  }

  add() {
    /*
    // FIXME: valiedering av data før innsending
    */
    kundeService.addNewKunde(this.fornavn, this.etternavn, this.mail, this.mobil, this.adresse, this.post_nr, this.sted, this.fodt, this.kommentar, () => {
   });
  }
  tilbake() {
    history.push('/kunde');
  }
}

class Kundesøk extends Component {
  kunder = [];
  fornavn = '';
  etternavn = '';
  mail = '';
  mobil = '';
  adresse = '';
  post_nr = '';
  sted = '';
  kommentar = '';

  render() {
    return (
      <>
        {/* Søkefunksjon for å søke etter registrerte kunder */}
        <br />
        <div className="col-md-4">
          <h4>Søk etter kunde</h4>
        </div>

        <div className="col-md-4">
          <br />
          <input type="text" name="sok" id="sok" placeholder="Søk i kundedatabasen" />
          <button id="kundesok" name="kundesok" className="btn btn-light" onClick={this.sok}>
            Søk
          </button>
        </div>
        <div id="kunderesultat">
          <div>
          {this.kunder.map(kunde => (
            <div key={kunde.person_id}>
              <ul>
                <li>Navn: {kunde.fornavn + " " + kunde.etternavn}</li>
                <li>Mail: {kunde.mail}</li>
                <li>Telefon: {kunde.tlf}</li>
                <li>Adresse: {kunde.adresse + " " + kunde.post_nr + " " + kunde.sted}</li>
                <li>Født: {kunde.fodt.toString()}</li>{/* FIXME:TRENGER FORMATERING */}
                <li>Kommentar: {kunde.kommentar}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
        <br />
        <div className="col-md-4">
          <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
      </>
    );
  }
  mounted() {
    kundeService.getKunder(kunder => {
      this.kunder = kunder;
    });
  }
  // sok() {
  //// FIXME: rik fix
  // }
  tilbake() {
    history.push('/kunde');
  }
}

class Sykkel extends Component {
  pris = '';
  typenavn = '';
  info = '';
  tilstand = '';
  hjul_storrelse = '';
  ramme_storrelse = '';
  girsystem = '';
  valgtSortering = '';
  valgtKlasse = '';
  sykler = [];
  sorteringer = [];
  sykkelklasser = [];

  render() {
    return (
      <>
        {/*Skjema for søk og valg av sykkel*/}
        <br />
        <div className="col-md-4">
          <h4>Velg sykkel</h4>
        </div>
        <div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="sorter"
                name="sorter"
                className="form-control"
                onChange={event => (this.valgtSortering = event.target.value)}
              >{this.sorteringer.map(metode => (
                  <option key={metode[1]}>
                    {metode[0]}
                  </option>
              ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="typenavn"
                name="typenavn"
                className="form-control"
                onChange={event => (this.valgtKlasse = event.target.value)}
              >
                {this.sykkelklasser.map(klasse => (
                <option key={klasse.klasse_id}>
                  {klasse.klassenavn}
                </option>
              ))}
              </select>
            </div>
          </div>
        </div>
        <div id="sykkelvisning">
          {this.sykler.map(sykkel => (
            <div key={sykkel.type_id}>
              <ul>
                <li><b>Navn: {sykkel.typenavn}</b></li>
                <li>Hjulstørrelse: {sykkel.hjul_storrelse}</li>
                <li>Rammestørrelse: {sykkel.ramme_storrelse}</li>
                <li>Girsystem: {sykkel.girsystem}</li>
                <li>Klasse: {sykkel.klasse_id}</li>
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }
  mounted() {//de to kallene med SQL gir feilmeldingen
    this.sorteringer = sykkelService.getSykkelSorteringer();

    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    sykkelService.getSykkelklasser(klasser =>{
      this.sykkelklasser = klasser;
    });
  }
}

class Ekstrautstyr extends Component {
  unavn = '';
  antall = '';
  pris = '';
  valgtKlasse = '';
  valgtSortering = '';
  utstyr = [];
  sorteringer = [];
  sykkelklasser = [];

  render() {
    return (
      <>
        {/*
    Skjema for søk og valg av ekstrautstyr
    */}
        <br />
        <div className="col-md-4">
          <h4>Velg ekstrautstyr</h4>
        </div>
        <div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="sorter"
                name="sorter"
                className="form-control"
                onChange={event => (this.valgtSortering = event.target.value)}
              >
                <option value="">Sorter etter</option>
                {this.sorteringer.map(metode => (
                    <option key={metode[1]}>
                      {metode[0]}
                    </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="kompatibel"
                name="kompatibel"
                className="form-control"
                onChange={event => (this.valgtKlasse = event.target.value)}
              >
                <option value="">Kompatibel med</option>
                {this.sykkelklasser.map(klasse => (
                <option key={klasse.klasse_id}>
                  {klasse.klassenavn}
                </option>
              ))}
              </select>
            </div>
          </div>
        </div>
        <div id="utstyrvisning">
          {this.utstyr.map(utstyr => (
          <div key={utstyr.utstyr_id}>
            <ul>
              <li><b>Navn: {utstyr.navn}</b></li>
              <li>Pris: {utstyr.pris}</li>
              <li>Antall:{utstyr.antall} </li>
            </ul>
          </div>
        ))}
          {/*<NavBar.Link to="/produktutstyr"></NavBar.Link>*/}
        </div>
      </>
    );
  }
  mounted() {
    vareService.getVarer(utstyr => {
      this.utstyr = utstyr;
    });

    sykkelService.getSykkelklasser(result => {
      this.sykkelklasser = result;
    })

    this.sorteringer = vareService.getSorteringer();
  }
}

class Handlekurv extends Component {
  render() {
    return (
      <>
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
      </>
    );
  }
}

class Aktivebestillinger extends Component {
  innhold = [];
  bestilling = [];
  bestillingsdato = '';
  beskrivelse = '';
  render() {
    return (
      <>
        {/* Visning av bestillinger som har status som aktiv (altså ikke tidligere gjennomførte leieforhold) */}
        <br />
        <Card title="Aktive bestillinger">
          <List>
            {this.bestilling.map(bestilling => (
              <List.Item key={bestilling.bestilling_id} to={'/aktivebestillinger/' + bestilling.bestilling_id}>
                {bestilling.beskrivelse}
              </List.Item>
            ))}
          </List>
        </Card>
      </>
    );
  }
  mounted() {
    bestillingService.getAktiveBestillinger(bestilling => {
      this.bestilling = bestilling;
    });
  }
}

class ProduktUtstyr extends Component {
  render() {
    return (
      <>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <div>produkt</div>
        <Row>
          <Column right>
            <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
              Tilbake
            </button>
          </Column>
        </Row>
      </>
    );
  }
  tilbake() {
    history.push('/ekstrautstyr');
  }
}

class ProduktSykkel extends Component {
  render() {
    return (
      <>
        {/* Visning av et enkelt produkt (sykler)*/}
        <div>produkt</div>
        <Row>
          <Column right>
            <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
              Tilbake
            </button>
          </Column>
        </Row>
      </>
    );
  }
  tilbake() {
    history.push('/sykkel');
  }
}

export {
  Kunde,
  RegistrerKunde,
  Kundesøk,
  Sykkel,
  Ekstrautstyr,
  Handlekurv,
  Aktivebestillinger,
  ProduktUtstyr,
  ProduktSykkel
};
