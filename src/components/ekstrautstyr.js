import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { sykkelService, vareService } from '../services';

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

export { Ekstrautstyr };
