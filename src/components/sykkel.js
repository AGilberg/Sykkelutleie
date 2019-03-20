import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Row, Column, Button, Img } from '../widgets';
import { history } from '../index.js';

class Sykkel extends Component {
  valgtSortering = '';
  valgtKlasse = '';
  sykler = []; // FIXME: fjern dersom denne siden kun skal være til sykkelklasser
  sorteringer = [];
  sykkelklasser = [];

  render() {
    return (
      <div>
        {/*Skjema for søk og valg av sykkel*/}
        <br />
        <div className="col-md-4">
          <h4>Velg sykkel</h4>
        </div>
        <div>
          <br />

          <div className="container-fluid">
            <div className="row" style={{ marginLeft: '27px', marginRight: '50px' }}>
              <div className="col-6">
                <div className="form-group">
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

              <div className="col-6">
                <div className="form-group">
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
          </div>
        </div>

        <div className="img">
          <ul className="flex-container wrap">
            {this.sykkelklasser.map(klasse => (
              <li className="flex-item" key={klasse.klasse_id}>
                <img
                  src={'images/sykler/' + klasse.klassenavn + '.jpg'}
                  onClick={() => history.push('/ProduktSykkel')}
                  alt={klasse.klassenavn}
                  width="180px"
                  height="180px"
                />
                {klasse.klassenavn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  mounted() {
    // FIXME: vi må bli enige om hvordan denne visningen skal være
    //de to kallene med SQL gir feilmeldingen
    this.sorteringer = sykkelService.getSykkelSorteringer();

    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    sykkelService.getSykkelklasser(klasser => {
      this.sykkelklasser = klasser;
    });
  }

  goToSykkel(id) {
    history.push('/ProduktSykkel/' + id);
  }
}

export { Sykkel };
