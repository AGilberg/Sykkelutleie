import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { Row, Column, Button } from '../widgets';
import { cartService } from '../services/CartService';

class Leieperiode extends Component {
  fra_dato = null;
  til_dato = null;
  min_date = '';
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
                min={this.min_date}
                value={this.min_date}
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
                min={this.min_date}
                value={this.min_date}
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

  mounted(){//YYYY-MM-DD
    let d = new Date();
    let day = d.getDate();
    if(day < 10){
      day = "0" + day;
    }
    let month = d.getMonth() + 1;
    if(month < 10){
      month = "0" + month;
    }
    let year = d.getFullYear();

    this.min_date = year + "-" + month +"-" + day;
    this.fra_dato = this.min_date;
    this.til_dato = this.min_date;
  }

  tilbake() {
    history.push('/');
  }

  velg() {/* Fra- og til dato klart for å legges inn i lokalt array her. */
    if(this.fra_dato != null && this.til_dato != null){
      cartService.setStartdato(this.fra_dato);
      cartService.setSluttdato(this.til_dato);
      history.push('/kunde');
    }
  }
}

export { Leieperiode };
