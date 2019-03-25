import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column, Button } from '../widgets';
import { history } from '../index.js';

class ProduktUtstyr extends Component {
  render() {
    return (
      <div className="main">
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <div>produkt</div>
        <Row>
          <Column right>
            <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }
  tilbake() {
    history.push('/ekstrautstyr');
  }
}

export { ProduktUtstyr };
