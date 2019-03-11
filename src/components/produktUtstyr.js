import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

class ProduktUtstyr extends Component {
  render() {
    return (
      <>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
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
    history.push('/ekstrautstyr');
  }
}

export { ProduktUtstyr };
