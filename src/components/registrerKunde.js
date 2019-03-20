import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column } from '../widgets';
import { kundeService } from '../services/KundeService.js';
import { history } from '../index.js';

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
      <div className="main">
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
      </div>
    );
  }

  add() {
    /*
    // FIXME: valiedering av data før innsending
    */
    kundeService.addNewKunde(
      this.fornavn,
      this.etternavn,
      this.mail,
      this.mobil,
      this.adresse,
      this.post_nr,
      this.sted,
      this.fodt,
      this.kommentar,
      () => {}
    );
  }
  tilbake() {
    history.push('/kunde');
  }
}

export { RegistrerKunde };
