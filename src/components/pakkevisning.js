import * as React from 'react';
import { Component } from 'react-simplified';
import { vareService } from '../services/VareService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { cartService } from '../services/CartService.js';
import varsel from '../services/notifications.js';

class Pakkevisning extends Component {
  pakkeinnhold = null;

  render() {
    if (!this.pakkeinnhold)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div style={{ marginLeft: '20px' }}>
        {/* Visning av et enkelt produkt (sykler)*/}
        <br />
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img
                  style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                  src={'images/pakker/Sommerpakken.jpg'}
                />
              </div>
              <div className="col-9">
                {' '}
                <h4>pakke</h4>
                <div className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <h5>Produktinformasjon: </h5>
                    <li>{this.pakkeinnhold.type_id}</li>
                    <li className="PrisText">Pris: masse kr,-</li>
                    <br />
                    <div className="borderShadow">
                      <li>beskrivelse</li>
                    </div>
                    <br />
                    <h5>Detaljer: </h5>
                    <li>Girsystem: </li>
                  </ul>
                </div>
                <br />
              </div>
            </div>
          </div>
        </Card>
        <br />

        <div className="col-8">
          <Row>
            <Column left>
              <Button.Light onClick={this.back}>Tilbake</Button.Light>
            </Column>

            <Column right>
              <Button.Success onClick={this.add}>Legg til bestilling</Button.Success>
            </Column>
          </Row>
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    vareService.getPakkeinnhold(this.props.match.params.pakke_id, pakkeinnhold => {
      this.pakkeinnhold = pakkeinnhold;
    });
  }

  back() {
    history.push('/pakker');
  }

  add() {
    if (this.sluttdato != null && this.avdeling != null && this.antall != 0) {
      let produkt = {
        kategori: 'sykkel',
        id: this.type.type_id,
        navn: this.type.typenavn,
        antall: this.antall,
        pris: this.type.pris * this.antall,
        id: this.ledigeSykler.slice()
      };
      console.log(produkt);
      cartService.addItem(produkt);
      varsel('Suksess!', 'Produktet ble lagt til i handlekurven.', 'vrsl-success');
      history.push('/sykkel');
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
