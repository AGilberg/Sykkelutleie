import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { sykkelService } from '../services/SykkelService.js';
import { vareService } from '../services/VareService.js';
import { Row, Column, Button, Img } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

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
      <div>
        {/*
    Skjema for søk og valg av ekstrautstyr
    */}

        <br />
        <div className="col-md-4">
          <h4>Velg ekstrautstyr</h4>
        </div>
        <div>
          <br />

          <div className="container-fluid">
            <div className="row justify-content-start">
              <div className="col-6">
                <div className="form-group">
                  <select
                    id="sorter"
                    name="sorter"
                    className="form-control"
                    onChange={event => (this.valgtSortering = event.target.value)}
                  >
                    <option value="">Sorter etter</option>
                    {this.sorteringer.map(metode => (
                      <option key={metode[1]}>{metode[0]}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <select
                    id="kompatibel"
                    name="kompatibel"
                    className="form-control"
                    onChange={event => (this.valgtKlasse = event.target.value)}
                  >
                    <option value="">Kompatibel med</option>
                    {this.sykkelklasser.map(klasse => (
                      <option key={klasse.klasse_id}>{klasse.klassenavn}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="img">
          <ul className="flex-container wrap">
            <li className="flex-item">
              <img
                src="images/SmåbarnsHjelm.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="hjelm"
                width="180px"
                height="180px"
              />
              Småbarnshjelm
            </li>
            <li className="flex-item">
              <img
                src="images/BarneHjelm.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="hjelm"
                width="180px"
                height="180px"
              />
              Barnehjelm
            </li>
            <li className="flex-item">
              <img
                src="images/VoksenHjelm.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="hjelm"
                width="180px"
                height="180px"
              />
              Voksenhjelm
            </li>
            <li className="flex-item">
              <img
                src="images/HengeLås.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="laas"
                width="180px"
                height="180px"
              />
              Hengelås
            </li>
            <li className="flex-item">
              <img
                src="images/SykkelLås.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="laas"
                width="180px"
                height="180px"
              />
              Sykkellås
            </li>
            <li className="flex-item">
              <img
                src="images/TauLås.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="laas"
                width="180px"
                height="180px"
              />
              Taulås
            </li>

            <li className="flex-item">
              <img
                src="images/FritidsLykt.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="lykt"
                width="180px"
                height="180px"
              />
              Fritidslykt
            </li>
            <li className="flex-item">
              <img
                src="images/SportsLykt.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="lykt"
                width="180px"
                height="180px"
              />
              Sportslykt
            </li>
            <li className="flex-item">
              <img
                src="images/SolcelleLykt.jpg"
                onClick={() => history.push('/ProduktUtstyr')}
                alt="lykt"
                width="180px"
                height="180px"
              />
              Solcellelykt
            </li>
          </ul>
        </div>
        <div id="utstyrvisning">
          {this.utstyr.map(utstyr => (
            <div key={utstyr.utstyr_id}>
              <ul>
                <li>
                  <b>Navn: {utstyr.navn}</b>
                </li>
                <li>Pris: {utstyr.pris}</li>
                <li>Antall:{utstyr.antall} </li>
              </ul>
            </div>
          ))}
          {/*<NavBar.Link to="/produktutstyr"></NavBar.Link>*/}
        </div>
      </div>
    );
  }
  mounted() {
    vareService.getVarer(utstyr => {
      this.utstyr = utstyr;
    });

    sykkelService.getSykkelklasser(result => {
      this.sykkelklasser = result;
    });

    this.sorteringer = vareService.getSorteringer();
  }
}
export { Ekstrautstyr };
