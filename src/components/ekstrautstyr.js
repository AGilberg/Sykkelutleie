import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { sykkelService } from '../services/SykkelService.js';
import { vareService } from '../services/VareService.js';
import { Row, Column, Button, Img } from '../widgets';
import { history } from '../index.js';

class Ekstrautstyr extends Component {
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
            <div className="row" style={{ marginLeft: '27px', marginRight: '50px' }}>
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
            {this.utstyr.map(utstyr => (
              <li key={utstyr.utstyr_id} className="flex-item">
                <img
                  src={'images/utstyr/' + utstyr.navn + '.jpg'}
                  onClick={() => history.push('/ProduktUtstyr')}
                  alt={utstyr.navn}
                  width="180px"
                  height="180px"
                />
                {utstyr.navn}
              </li>
            ))}
          </ul>
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
