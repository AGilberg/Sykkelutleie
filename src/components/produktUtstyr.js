import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { utstyrService } from '../services/UtstyrService.js';
import ReactLoading from 'react-loading';

class ProduktUtstyr extends Component {
  altUtstyr = [];
  utstyr = null;
  avdelinger = null;

  render() {
    if (!this.utstyr || !this.avdelinger)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    console.log(this.utstyr.navn);
    return (
      <div style={{ marginLeft: '20px' }}>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <br />
        <h4>{this.utstyr.navn}</h4>

        <Card title="Produktinformasjon:" style={{ margin: '24px', marginLeft: '0px', marginRight: '0px' }}>
          <ul style={{ listStyleType: 'none' }}>
            <li>Pris: {this.utstyr.pris} kr</li>
            <li>Antall: {this.utstyr.antall}</li>
            <li>{this.avdelinger.navn}</li>
          </ul>
        </Card>
        <br />

        <Card />

        <div className="col-4">
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
    utstyrService.getUtstyrNavn(this.props.match.params.id, utstyr => {
      this.utstyr = utstyr;
      console.log(this.utstyr);
    });

    utstyrService.getAvdelingNavn(this.props.match.params.id, avdeling => {
      this.avdelinger = avdeling;
      console.log(this.avdelinger);
    });
  }

  back() {
    history.push('/ekstrautstyr');
  }

  save() {
    history.push('/handlekurv');
  }
}

export { ProduktUtstyr };
