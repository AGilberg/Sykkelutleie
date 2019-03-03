import * as React from 'react';
import { Component } from 'react-simplified';

class RegistrerKunde extends Component {
  kjonn = 1;
  fornavn = '';
  etternavn = '';
  fodt = '';
  epost = '';
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
          <label className="col-sm-4 control-label" htmlFor="kjonn">Kjønn</label>
          <div className="col-sm-4">
            <select id="kjonn" name="kjonn" className="form-control" value={this.kjonn} onChange={event => (this.kjonn = event.target.value)}>
              <option value={1}>Mann</option>
              <option value={2}>Kvinne</option>
            </select>
          </div>
        </div>
        {/* Navn */}
        <div className="form-group">
          <label className="col-sm-4 control-label" htmlFor="fornavn">Navn</label>
          <div className="col-sm-4">
            <input id="fornavn" name="fornavn" type="text" placeholder="Fornavn" className="form-control input-md" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} required />
            <input id="etternavn" name="etternavn" type="text" placeholder="Etternavn" className="form-control input-md" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} required />
          </div>
        </div>
        {/* Fødselsdato (annet format på dette, mtp brukervennlighet?)*/}
        <div className="form-group">
          <label className="col-sm-4 control-label" htmlFor="fodt">Fødselsdato</label>
          <div className="col-sm-4">
            <input id="fodt" name="fodt" type="text" placeholder="dd.mm.åååå" className="form-control input-md" onChange={event => (this.fodt = event.target.value)} required />
          </div>
        </div>
        {/* Epost */}
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="epost">Epost</label>
          <div className="col-md-4">
            <input id="epost" name="epost" type="text" placeholder="Epost" className="form-control input-md" value={this.epost} onChange={event => (this.epost = event.target.value)} required />
          </div>
        </div>
        {/* Ønsker reklame. (Må ikke ha med dette) */}
        <div className="form-group">
          <label className="col-sm-4 control-label" htmlFor="tilbud">Ønsker å motta tilbud</label>
          <div className="col-sm-4">
            <label className="radio-inline" htmlFor="tilbud-0">
              <input type="radio" name="tilbud" id="tilbud-0" defaultValue={true} onChange={event => (this.tilbud = event.target.value)} defaultChecked="checked" />
              Ja
            </label>
            <label className="radio-inline" htmlFor="tilbud-1">
              <input type="radio" name="tilbud" id="tilbud-1" defaultValue={false} onChange={event => (this.tilbud = event.target.value)} />
              Nei
            </label>
          </div>
        </div>
        {/* Registreringsknapp */}
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="submit" />
          <div className="col-md-4">
            <button id="submit" name="submit" className="btn btn-success" onClick={this.add}>Registrer</button>
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
}

export default RegistrerKunde;
