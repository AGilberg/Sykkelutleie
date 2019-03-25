import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Row, Column, Button, Img } from '../widgets';
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
  sorterSykkelklasse = [];
  avdelinger = [];

  render() {
    let sykler = null;
    let sykkelklasser = null;
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
                    id="typenavn"
                    name="typenavn"
                    className="form-control"
                    onChange={event => this.changeContent(event)}
                  >
                    <option>Sykkeltype</option>
                    {this.sorterSykkelklasse.map(klasse => (
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
                    {this.avdelinger.map(sykkelavdeling => (
                      <option key={sykkelavdeling.avdeling_id}>{sykkelavdeling.navn}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="img">
          <ul className="flex-container wrap">
            {this.state.sykkeltyper.map(sykkel => (
              <li className="flex-item" key={sykkel.type_id}>
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

    sykkelService.getSykkelklasser(klasser => {
      this.sorterSykkelklasse = klasser;
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
    sykkelService.visKlasse(event.target.value, this.state.alleSykkeltyper, nyVisning => {
      sykkelService.sortSykkelsok(this.valgtSortering, nyVisning, sortert => {
        this.setState({ sykkeltyper: sortert });
      });
    });
  }
}

export { Sykkel };
