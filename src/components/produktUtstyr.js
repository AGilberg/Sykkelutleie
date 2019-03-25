import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { utstyrService } from '../services/UtstyrService.js';
import ReactLoading from 'react-loading';

class ProduktUtstyr extends Component {
  utstyr = null;

  render() {
    return (
      <div className="main">
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <br />
        <div className="col-md-4">
          <h4>{utstyr.navn}</h4>
        </div>

        <br />

        <Row>
          <Column right>
            <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    utstyrService;
  }

  tilbake() {
    history.push('/sykkel');
  }
}

export { ProduktUtstyr };
