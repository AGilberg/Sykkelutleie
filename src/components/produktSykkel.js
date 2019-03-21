import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column } from '../widgets';
import { history } from '../index.js';

class ProduktSykkel extends Component {
  render() {
    return (
      <div className="main">
        {/* Visning av et enkelt produkt (sykler)*/}
        <div>produkt {this.klasse_id}</div>
        <Row>
          <Column right>
            <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
              Tilbake
            </button>
          </Column>
        </Row>
      </div>
    );
  }
  tilbake() {
    history.push('/sykkel');
  }
}

export { ProduktSykkel };
