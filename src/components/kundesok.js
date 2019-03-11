import * as React from 'react';
import { Component } from 'react-simplified';
import { kundeService } from '../services';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

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

export { Kundesøk };
