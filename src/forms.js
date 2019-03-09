import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';
import { handlekurv } from './index.js';

class Kunde extends Component {
  render() {
    return (
      <>
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
        {/*
  Skjema for registrering av kunde.
  Tilpasset for å brukes med Bootstrap,
  om vi velger å gjøre det.
  */}
        <div>
          <form className="form-horizontal">
            <fieldset>
              <legend>Registrer kunde</legend>
              {/* Kjønn */}
              <div className="form-group">
                <label className="col-sm-4 control-label" htmlFor="kjonn">
                  Kjønn
                </label>
                <div className="col-sm-4">
                  <select
                    id="kjonn"
                    name="kjonn"
                    className="form-control"
                    value={this.kjonn}
                    onChange={event => (this.kjonn = event.target.value)}
                  >
                    <option value={1}>Mann</option>
                    <option value={2}>Kvinne</option>
                    <option value={3}>Ikke-binær</option>
                    <option value={4}>Apachehelikopter</option>
                    <option value={5}>Vil ikke si det:(</option>
                  </select>
                </div>
              </div>
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
                      <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.cancel}>
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
    Service for å legge til kunden i databasen. Rikard, U fix?
    */
  }
  cancel() {
    /*
    Service for å gå tilbake til "kunde". Rikard, U fix?
    */
  }
}

class Kundesøk extends Component {
  person = [];
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
        <div id="kunderesultat">{this.kunde}</div>
        <br />
        <div className="col-md-4">
          <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.cancel}>
            Tilbake
          </button>
        </div>
      </>
    );
  }
  // mounted() {
  //   kundeService.getKunde(kunde => {
  //     this.kunde = kunde;
  //   });
  // }
  // sok() {
  //rik fix
  // }
  cancel() {
    /*
    Service for å gå tilbake til "kunde". Rikard, U fix?
    */
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
  valg = '';
  sykkel = [];

  render() {
    return (
      <>
        {/*
    Skjema for valg av sykkel
    */}
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
                onChange={event => (this.valg = event.target.value)}
              >
                <option value="">Sorter etter</option>
                <option value={1}>Alfabetisk</option>
                <option value={2}>Pris</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="typenavn"
                name="typenavn"
                className="form-control"
                onChange={event => (this.valg = event.target.value)}
              >
                <option value="">Sykkeltype</option>
                <option value={3}>Terrengsykler</option>
                <option value={4}>Barnesykler</option>
                <option value={5}>Bysykler</option>
                <option value={6}>Racersykler</option>
                <option value={7}>Damesykler</option>
              </select>
            </div>
          </div>
        </div>
        <div id="sykkelvisning">
          <NavBar.Link to="/produkt">{this.valg}</NavBar.Link>
        </div>
      </>
    );
  }
  // mounted() {
  //   sykkelService.getSykler(sykkel => {
  //     this.sykkel = sykkel;
  //   });
  // }
}

class Ekstrautstyr extends Component {
  evalg = '';
  unavn = '';
  antall = '';
  pris = '';
  untstyr = [];

  render() {
    return (
      <>
        {/*
    Skjema for valg av ekstrautstyr
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
                onChange={event => (this.evalg = event.target.value)}
              >
                <option value="">Sorter etter</option>
                <option value={1}>Alfabetisk</option>
                <option value={2}>Pris</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="kompatibel"
                name="kompatibel"
                className="form-control"
                onChange={event => (this.evalg = event.target.value)}
              >
                <option value="">Kompatibel med</option>
                <option value={3}>Terrengsykler</option>
                <option value={4}>Barnesykler</option>
                <option value={5}>Bysykler</option>
                <option value={6}>Racersykler</option>
                <option value={7}>Damesykler</option>
              </select>
            </div>
          </div>
        </div>
        <div id="utstyrvisning">
          <NavBar.Link to="/produkt">{this.evalg}</NavBar.Link>
        </div>
      </>
    );
  }
  // mounted() {
  //   utstyrService.getUtstyr(utstyr => {
  //     this.utstyr = utstyr;
  //   });
  // }
}

class Handlekurv extends Component {
  render() {
    return (
      <>
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
        <br /><br />
        <NavBar.Link to="/utsjekk">
          <button className="btn btn-success" id="utsjekk">Utsjekk</button>
        </NavBar.Link>
      </>
    );
  }
}

class Aktivebestillinger extends Component {
  innhold = [];
  bestilling = [];
  bestillingsdato = '';
  leie_beskrivelse = '';
  render() {
    return (
      <>
        <br />
        <div className="col-md-4">
          <h4>Aktive bestillinger</h4>
        </div>
        <div>
          {this.bestilling.map(bestilling => (
            <Card key={bestilling.id} to={'/bestilling/' + bestilling.id}>
              {bestilling.leie_beskrivelse}
            </Card>
          ))}
        </div>
      </>
    );
  }
}

class Produkt extends Component {
  render() {
    return <div>produkt</div>;
  }
}

class Utsjekk extends Component {
  render() {
    return (
      <Card>
        <div>Utsjekk</div>
      </Card>
    );
  }
}


export { Kunde, RegistrerKunde, Kundesøk, Sykkel, Ekstrautstyr, Handlekurv, Aktivebestillinger, Produkt, Utsjekk };
