import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { utstyrService } from '../services/UtstyrService.js';
import ReactLoading from 'react-loading';

class ProduktUtstyr extends Component {
  utstyr = null;
  avdelinger = null;

  render() {
    if (!this.utstyr || !this.avdelinger)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div style={{ marginLeft: '20px' }}>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <br />
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img
                  style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                  src={'images/utstyr/' + this.utstyr.navn + '.jpg'}
                />
              </div>
              <div className="col-9">
                {' '}
                <h4>{this.utstyr.navn}</h4>
                <Card title="Produktinformasjon:" className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <li className="text">Pris: {this.utstyr.pris} kr,-</li>
                    <li>Lagerstatus: {this.utstyr.antall}</li>
                    <li>Antall://IKKE FERDIG</li>
                    <li>{this.avdelinger.navn}</li>
                  </ul>
                </Card>
                <br />
              </div>
            </div>
          </div>
        </Card>

        <br />
        <div className="col-12">
          <Row>
            <Column left>
              <Button.Success onClick={this.save}>Legg til</Button.Success>
            </Column>
            <Column>
              <Button.Info onClick={this.handlekurv}>Til handlekurv</Button.Info>
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
    utstyrService.getUtstyrNavn(this.props.match.params.id, utstyr => {
      this.utstyr = utstyr;
    });

    utstyrService.getAvdelingNavn(this.props.match.params.id, avdeling => {
      this.avdelinger = avdeling;
    });
  }

  antall() {
    var count = 1;
    function plus() {
      count++;
      countEl.value = count;
    }
    function minus() {
      if (count > 1) {
        count--;
        countEl.value = count;
      }
    }
  }

  back() {
    history.push('/ekstrautstyr');
  }

  save() {
    history.push();
  }
  handlekurv() {
    history.push('/handlekurv');
  }
}

export { ProduktUtstyr };
