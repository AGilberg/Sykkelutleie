import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';

class ProduktSykkel extends Component {
  sykkeltyper = null;
  avdelinger = null;
  klasser = null;

  render() {
    if (!this.sykkeltyper || !this.avdelinger || !this.klasser)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div className="main">
        {/* Visning av et enkelt produkt (sykler)*/}

        <br />
        <div className="col-md-4">
          <h4>Hei</h4>
        </div>

        <br />

        <div>
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col-3">
                  <img
                    style={{ width: '200px', height: '200px', border: '1px solid lightgrey', padding: '30px' }}
                    src={'images/sykler/' + this.sykkeltyper.typenavn + '.jpg'}
                  />
                </div>
                <div className="col-9">
                  {' '}
                  <h4>{this.klasser.klassenavn}</h4>
                  <Card title="Produktinformasjon:" style={{ margin: '24px', marginLeft: '0px', marginRight: '0px' }}>
                    <ul style={{ listStyleType: 'none' }}>
                      <li>Pris: {this.sykkeltyper.pris} kr</li>
                      <li>Antall: </li>
                      <li>{this.avdelinger.navn}</li>
                    </ul>
                  </Card>
                  <br />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <br />
        <div className="col-12">
          <Row>
            <Column left>
              <Button.Success onClick={this.save}>Legg til</Button.Success>
            </Column>
            <Column right>
              <Button.Light onClick={this.back}>Tilbake</Button.Light>
            </Column>
          </Row>
        </div>
      </div>
    );
  }
  mounted() {
    sykkelService.getSykkelklasser(sykkeltyper => {
      this.sykkeltyper = sykkeltyper;
      console.log(this.sykkeltyper);
    });

    sykkelService.getAvdelinger(avdelinger => {
      this.avdelinger = avdelinger;
      console.log(this.avdelinger);
    });

    sykkelService.getSykkeltyper(klasser => {
      this.klasser = klasser;
      console.log(this.klasser);
    });
  }

  tilbake() {
    history.push('/sykkel');
  }

  save() {
    history.push('/handlekurv');
  }
}

export { ProduktSykkel };
