import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';

class Ansatt extends Component {
  render() {
    return (
      <div className="col-md-4" style={{ margin: '30px' }}>
        <h4>Ansatt: </h4>

        <Row>
          <Column left>
            <Button.Success>Legg til</Button.Success>
          </Column>
          <Column right>
            <Button.Light>Tilbake</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }
}

export { Ansatt };
