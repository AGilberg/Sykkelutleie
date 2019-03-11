import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class ProduktSykkel extends Component {
  render() {
    return (
      <>
        {/* Visning av et enkelt produkt (sykler)*/}
        <div>produkt</div>
        <Row>
          <Column right>
            <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
              Tilbake
            </button>
          </Column>
        </Row>
      </>
    );
  }
  tilbake() {
    history.push('/sykkel');
  }
}

export { ProduktSykkel };
