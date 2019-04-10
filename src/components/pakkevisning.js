import * as React from 'react';
import { Component } from 'react-simplified';
import { vareService } from '../services/VareService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { cartService } from '../services/CartService.js';
import varsel from '../services/notifications.js';

class Pakkevisning extends Component {
  pakkesykkel = null;
  pakkeutstyr = null;
  pakke = null;
  innhold = null;
  startdato = null;
  sluttdato = null;
  avdeling = null;

  render() {
    if (!this.pakkesykkel || !this.pakkeutstyr || !this.pakke || !this.innhold)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div>
        <br />
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                {this.pakke.map(pakke => (
                  <img
                    style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                    src={'images/pakker/' + pakke.pakkenavn + '.jpg'}
                  />
                ))}
              </div>
              <div className="col-9">
                {' '}
                {this.pakke.map(pakke => (
                  <h4 key={pakke.pakke_id}>{pakke.pakkenavn}</h4>
                ))}
                <br />
                <div className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <h5>Sykler: </h5>
                    {this.pakkesykkel.map(pakkesykkel => (
                      <li key={pakkesykkel.pakke_id}>
                        {pakkesykkel.typenavn}, antall: {pakkesykkel.ant}
                      </li>
                    ))}

                    <br />

                    <h5>Utstyr: </h5>
                    {this.pakkeutstyr.map(pakkeutstyr => (
                      <li key={pakkeutstyr.pakke_id}>
                        {pakkeutstyr.navn}, antall: {pakkeutstyr.ant}
                        <br />
                      </li>
                    ))}

                    <br />

                    {this.pakke.map(pakke => (
                      <li className="PrisText" key={pakke.pakke_id}>
                        Pris: {pakke.pris} kr,-
                      </li>
                    ))}
                    <br />
                    <div className="borderShadow">
                      {this.pakke.map(pakke => (
                        <li key={pakke.pakke_id}>{pakke.beskrivelse}</li>
                      ))}
                    </div>
                  </ul>
                </div>
                <br />
              </div>
            </div>
          </div>
        </Card>
        <br />
        <Row>
          <Column right>
            <Button.Light onClick={this.back}>Tilbake</Button.Light>
          </Column>
          <Column left>
            <Button.Success onClick={this.add}>Legg til i handlekurv</Button.Success>
          </Column>
        </Row>
      </div>
    );
  }
  mounted() {
    vareService.getPakkeinnholdsykler(this.props.match.params.pakke_id, pakkesykkel => {
      this.pakkesykkel = pakkesykkel;
    });
    vareService.getPakkeinnholdutstyr(this.props.match.params.pakke_id, pakkeutstyr => {
      this.pakkeutstyr = pakkeutstyr;
    });
    vareService.getPakke(this.props.match.params.pakke_id, pakke => {
      this.pakke = pakke;
    });
    vareService.getInnhold(this.props.match.params.pakkeinnhold_id, innhold => {
      this.innhold = innhold;
    });

    this.sluttdato = cartService.getSluttdato();
    this.startdato = cartService.getStartdato();
    this.avdeling = cartService.getAvdeling();

    if (this.sluttdato != null && this.avdeling != -1) {
      this.antall = 0;
      if (this.sluttdato == null) {
        varsel('OBS!', 'Leieperiode er ikke valgt', 'vrsl-danger');
      }
      if (this.avdeling == -1) {
        varsel('OBS!', 'Avdeling er ikke valgt', 'vrsl-danger');
      }
    }
  }

  add() {
    if (this.sluttdato != null && this.avdeling != null) {
      let produkt = {
        kategori: 'pakke',
        id: this.pakkesykkel.type_id,
        navn: this.pakkesykkel.typenavn,
        pris: this.pakke.pris
      };

      console.log(produkt);
      cartService.addItem(produkt);
      varsel('Suksess!', 'Pakken ble lagt til i handlekurven.', 'vrsl-success');
      history.push('/pakker');
    } else {
      if (this.sluttdato == null) {
        varsel('Feil!', 'Leieperiode er ikke valgt', 'vrsl-danger');
      }
      if (this.avdeling == -1) {
        varsel('Feil!', 'Avdeling er ikke valgt', 'vrsl-danger');
      }
    }
  }
}

export { Pakkevisning };
