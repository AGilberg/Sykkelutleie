import * as React from 'react';
import { Component } from 'react-simplified';
import { pakkeService } from '../services/PakkeService.js';
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
                  <img key={pakke.pakke_id}
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
                      <li key={pakkesykkel.type_id}>
                        {pakkesykkel.typenavn}, antall: {pakkesykkel.ant}
                      </li>
                    ))}

                    <br />

                    <h5>Utstyr: </h5>
                    {this.pakkeutstyr.map(pakkeutstyr => (
                      <li key={pakkeutstyr.utstyr_id}>
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
    pakkeService.getPakkeinnholdsykler(this.props.match.params.pakke_id, pakkesykkel => {
      this.pakkesykkel = pakkesykkel;
    });
    pakkeService.getPakkeinnholdutstyr(this.props.match.params.pakke_id, pakkeutstyr => {
      this.pakkeutstyr = pakkeutstyr;
    });
    pakkeService.getPakke(this.props.match.params.pakke_id, pakke => {
      this.pakke = pakke;
    });
    pakkeService.getInnhold(this.props.match.params.pakkeinnhold_id, innhold => {
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
      this.pakkesykkel.map(sykkel => {
        let produkt = {
          kategori: 'sykkel',
          id: [{sykkel_id: sykkel.type_id}],
          navn: sykkel.typenavn,
          antall: sykkel.ant,
          pris: 0
        }
        cartService.addItem(produkt);
      });
      this.pakkeutstyr.map(utstyr => {
        let produkt = {
          kategori: 'utstyr',
          id: utstyr.utstyr_id,
          navn: utstyr.navn,
          antall: utstyr.ant,
          pris: 0
        }
        cartService.addItem(produkt);
      });
      this.pakke.map(pakke => {
        let valgtPakke = {
          kategori: 'pakke',
          id: pakke.pakke_id,
          navn: pakke.pakkenavn,
          pris: pakke.pris
        }
        cartService.addItem(valgtPakke);
      })
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
  back() {
    history.push('/pakker');
  }
}

export { Pakkevisning };
