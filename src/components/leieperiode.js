import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { Row, Column, Button } from '../widgets';

class Leieperiode extends Component {
  fra_dato = '';
  til_dato = '';
  render() {
    return (
      <div>
        {/* Visning av leieperioden*/}
        <br />
        <div className="col-md-4">
          <h4>Leieperiode</h4>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Fra dato</th>
              <th>Til dato</th>
            </tr>
            <tr>
              <td>
              <input
                id="fra_dato"
                name="fra_dato"
                type="date"
                className="form-control input-md"
                onChange={event => (this.fra_dato = event.target.value)}
                required
              />
              </td>
              <td>
              <input
                id="til_dato"
                name="til_dato"
                type="date"
                className="form-control input-md"
                onChange={event => (this.til_dato = event.target.value)}
                required
              />
              </td>
            </tr>
          </tbody>
        </table>
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
    console.log(this.fra_dato, this.til_dato);
    {/* Fra- og til dato klart for å legges inn i lokalt array her. */}
    history.push('/kunde');
  }
}

export { Leieperiode };
