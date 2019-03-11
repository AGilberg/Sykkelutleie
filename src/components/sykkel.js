import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services';

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

export { Sykkel };
