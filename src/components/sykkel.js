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
                  <img src="images/VoksenSykkel.jpg" alt="bike" />
                  Voksensykkel
                </li>
                <li className="flex-item">
                  <img src="images/FamilieSykkel.jpg" alt="bike" width="150px" height="150px" />
                  Familiesykkel
                </li>
                <li className="flex-item">
                  <img src="images/BarneSykkel.jpg" alt="bike" width="150px" height="150px" />
                  Barnesykkel
                </li>
                <li className="flex-item">
                  <img src="images/RacingSykkel.jpg" alt="bike" width="150px" height="150px" />
                  Racingsykkel
                </li>
                <li className="flex-item">
                  <img src="images/Terrengssykkel.jpg" alt="bike" width="150px" height="150px" />
                  Terrengssykkel
                </li>
                <li className="flex-item">
                  <img src="images/BySykkel.jpg" alt="bike" width="150px" height="150px" />
                  Bysykkel
                </li>
                <li className="flex-item">
                  <img src="images/ElSykkel.jpg" alt="bike" width="150px" height="150px" />
                  Elsykkel
                </li>
                <li className="flex-item">
                  <img src="images/TrehjulSykkel.jpg" alt="bike" width="150px" height="150px" />
                  Trehjulsykkel
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
