import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Row, Column } from '../widgets';

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
              >
                <option>Sorter etter</option>
                {this.sorteringer.map(metode => (
                  <option key={metode[1]}>{metode[0]}</option>
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
                <option>Sykkeltype</option>
                {this.sykkelklasser.map(klasse => (
                  <option key={klasse.klasse_id}>{klasse.klassenavn}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Row>
          <Column>
            <div id="img">
              <ul className="flex-container wrap">
                <li className="flex-item">
                  <img src="lbike.jpg" alt="bike" />
                  Voksen
                </li>
                <li className="flex-item">
                  <img src="bbike.jpg" alt="bike" />
                  Barnesykkel
                </li>
                <li className="flex-item">
                  <img src="sbike.jpg" alt="bike" />
                  Sykkel
                </li>
                <li className="flex-item">
                  <img src="lbike.jpg" alt="bike" />
                  Voksen
                </li>
                <li className="flex-item">
                  <img src="lbike.jpg" alt="bike" />
                  Tandem
                </li>
                <li className="flex-item">
                  <img src="sbike.jpg" alt="bike" />
                  Racer
                </li>
                <li className="flex-item">
                  <img src="lbike.jpg" alt="bike" />
                  Trehjul
                </li>
                <li className="flex-item">
                  <img src="bbike.jpg" alt="bike" />
                  Vanlig
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </>
    );
  }
  mounted() {
    //de to kallene med SQL gir feilmeldingen
    this.sorteringer = sykkelService.getSykkelSorteringer();

    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    sykkelService.getSykkelklasser(klasser => {
      this.sykkelklasser = klasser;
    });
  }
}

export { Sykkel };
