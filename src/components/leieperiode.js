import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { Row, Column, Button } from '../widgets';

class Leieperiode extends Component {
  render() {
    return (
      <div>
        {/* Visning av leieperioden*/}
        <br />
        <div className="col-md-4">
          <h4>Leieperiode</h4>
        </div>
        <br />

        <Row>
          <Column left>
            <Button.Success onClick={this.velg}>Velg</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }
  tilbake() {
    history.push('/');
  }

  velg() {
    history.push('/kunde');
  }
}

export { Leieperiode };
