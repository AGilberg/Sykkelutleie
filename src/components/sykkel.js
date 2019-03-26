
import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Row, Column } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { cartService } from '../services/CartService';

class Sykkel extends Component {
  state = {
    alleSykkeltyper: [], //denne holder alle sykkeltypene
    sykkeltyper: null //denne holder alle sykkeltypene som skal vises
  };

  sorterMetode = [];
  valgtSortering = '';
  valgtKlasse = '';
  sykler = []; // FIXME: fjern dersom denne siden kun skal være til sykkelr
  sorteringer = [];
  sykkelklasser = [];
  sykkeltyper = [];
  valgtKlassenavn = '';
  avdelinger = [];
  valgtAvdeling = '';

  render() {
    if (!this.state.sykkeltyper)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
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
                    onChange={event => this.changeOrder(event)}
                  >
                    <option>Sorter etter</option>
                    {this.sorterMetode.map(metode => (
                      <option key={metode[1]}>{metode[0]}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <select
                    id="klassenavn"
                    name="klassenavn"
                    className="form-control"
                    onChange={event => this.changeContent(event)}
                  >
                    <option value="">Sykkelklasse</option>
                    {this.sykkelklasser.map(klasse => (
                      <option key={klasse.klasse_id}>{klasse.klassenavn}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <select
                    id="avdeling"
                    name="avdeling"
                    className="form-control"
                    onChange={event => this.changeContent(event)}
                  >
                    <option value="">Avdeling</option>
                    {this.avdelinger.map(avdeling => (
                      <option key={avdeling.avdeling_id}>{avdeling.navn}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="img">
          <ul className="flex-container wrap">
            {this.sykkeltyper.map(sykkel => (
              <li className="flex-item" key={sykkel.klasse_id}>
                <img
                  src={'images/sykler/' + sykkel.klassenavn + '.jpg'}
                  onClick={() => history.push('/ProduktSykkel')}
                  alt={sykkel.typenavn}
                  width="180px"
                  height="180px"
                />
                {sykkel.typenavn}
                <br />
                {'Pris: ' + sykkel.pris}
                <br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  mounted() {
    this.sorterMetode = sykkelService.getSykkelSorteringer();

    sykkelService.getSykkeltyper(typer => {
      this.setState({ alleSykkeltyper: typer });
      this.setState({ sykkeltyper: typer });
    });

    sykkelService.getSykkeltyper(klasser => {
      this.sykkeltyper = klasser;
    });

    sykkelService.getAvdelinger(avdelinger => {
      this.avdelinger = avdelinger;
    });
  }

  goToSykkel(id) {
    history.push('/ProduktSykkel/' + id);
  }

  changeOrder(event) {
    this.valgtSortering = event.target.value;
    sykkelService.sortSykkelsok(this.valgtSortering, this.state.sykkeltyper, sortert => {
      this.setState({ sykkeltyper: sortert });
    });
  }

  changeContent(event) {
    switch (event.target.name) {
      case 'klassenavn':
        this.valgtKlassenavn = event.target.value;
        break;
      case 'avdeling':
        this.valgtAvdeling = event.target.value;
    }

    sykkelService.visKlasse(this.valgtKlassenavn, this.state.alleSykkeltyper, utvalg1 => {
      sykkelService.visAvdeling(this.valgtAvdeling, utvalg1, utvalg2 => {
        sykkelService.sortSykkelsok(this.valgtSortering, utvalg2, sortert => {
          this.setState({ sykkeltyper: sortert });
        });
      });
    });
  }
}

export { Sykkel };
