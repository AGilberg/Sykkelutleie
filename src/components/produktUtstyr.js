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
      <div>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <br />
        <div className="col-md-4">
          <h4>Produkt</h4>
        </div>

        <br />

        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <div className="form-group" />
            </div>
          </div>
        </div>

        <Row>
          <Column right>
            <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    utstyrService.getUtstyr(this.props.match.params.u.avdeling_id, utstyr => {
      this.utstyr = utstyr;
    });
  }

  tilbake() {
    history.push('/sykkel');
  }
}

export { ProduktUtstyr };
