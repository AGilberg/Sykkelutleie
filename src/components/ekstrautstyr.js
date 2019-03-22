import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { sykkelService } from '../services/SykkelService.js';
import { utstyrService } from '../services/UtstyrService.js';
import { Row, Column, Button, Img } from '../widgets';
import { history } from '../index.js';

class Ekstrautstyr extends Component {
  state = {
    altUtstyr:[],
    utstyr:[]
  }
  valgtAvdeling = "";// FIXME: ikke i bruk, men kan kanskje brukes for å kunne søke med flere parameter
  valgtKomp = "";// FIXME: ikke i bruk, men kan kanskje brukes for å kunne søke med flere parameter
  sorteringer = [];
  sykkelklasser = [];
  avdelinger = [];

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
                    onChange={event => (this.changeOrder(event))}
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
                    onChange={event => (this.changeContentKomp(event))}
                  >
                    <option value="">Kompatibel med</option>
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
                    onChange={event => (this.changeContentAvdeling(event))}
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
            {this.state.utstyr.map(utstyr => (
              <li key={utstyr.utstyr_id} className="flex-item">
                <img
                  src={'images/utstyr/' + utstyr.navn + '.jpg'}
                  onClick={() => history.push('/ProduktUtstyr')}
                  alt={utstyr.navn}
                  width="180px"
                  height="180px"
                />
                {utstyr.navn}
                <br/>
                {utstyr.pris}
                <br/>
                {utstyr.avdelingsnavn}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  mounted() {
    utstyrService.getUtstyr(utstyr => {
      this.setState({altUtstyr: utstyr});
      this.setState({utstyr: utstyr});
    });

    sykkelService.getSykkelklasser(result => {
      this.sykkelklasser = result;
    });
    utstyrService.getAvdelinger(result => {
      this.avdelinger = result;
    });

    this.sorteringer = utstyrService.getSorteringer();
  }

  changeOrder(event){//endre rekkefølgen på utstyret
    utstyrService.sortUtstyrsok(event.target.value, this.state.utstyr, sortert =>{
      this.setState({utstyr: sortert});
    });
  }

  changeContentKomp(event){
    utstyrService.visKompatibel(event.target.value, this.state.altUtstyr, utvalg =>{
      this.setState({utstyr: utvalg});
    });
  }

  changeContentAvdeling(event){
    utstyrService.visAvdeling(event.target.value, this.state.altUtstyr, utvalg =>{
      this.setState({utstyr: utvalg});
    });
  }
}
export { Ekstrautstyr };
