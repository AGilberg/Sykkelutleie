import * as React from 'react';
import { Component } from 'react-simplified';
import { Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { utstyrService } from '../services/UtstyrService.js';
import ReactLoading from 'react-loading';

class ProduktUtstyr extends Component {
  utstyr = null;

  render() {
    if (!this.state.utstyr)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div className="main">
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <div>produkt</div>

        <Row>
          <Column right>
<<<<<<< HEAD
            <Button.Light onClick={this.tilbake}>
              Tilbake
            </Button.Light>
=======
            <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
>>>>>>> 8c3c54da15ae287769a8bd5aeb1f4ee6760395f6
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
