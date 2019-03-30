import * as React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { Card, Row, Column, Button } from '../widgets';
import { cartService } from '../services/CartService';
import varsel from '../services/notifications.js';

class Leieperiode extends Component {
  fra_dato = '';
  til_dato = '';
  min_date = '';
  render() {
    return (
      <div>
        {/* Visning av leieperioden*/}
        <br />
        <Card>
          <h4>Leieperiode</h4>

          <table className="table" style={{ marginTop: '50px', marginBottom: '100px' }}>
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
                    style={{
                      marginRight: '40px',
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
                    }}
                    className="form-control input-md"
                    min={this.min_date}
                    value={this.fra_dato}
                    onChange={event => {
                      this.updateCalendar(event);
                    }}
                    required
                  />
                </td>

                <td>
                  <input
                    id="til_dato"
                    name="til_dato"
                    type="date"
                    className="form-control input-md"
                    style={{
                      marginRight: '40px',
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
                    }}
                    min={this.min_date}
                    value={this.til_dato}
                    onChange={event => {
                      this.updateCalendar(event);
                    }}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <Row>
            <Column right>
              <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
            </Column>
            <Column left>
              <Button.Success onClick={this.velg}>Velg</Button.Success>
            </Column>
          </Row>
        </Card>
      </div>
    );
  }

  mounted() {
    //YYYY-MM-DD
    let d = new Date();
    let day = d.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let year = d.getFullYear();

    this.min_date = year + '-' + month + '-' + day;
    this.fra_dato = this.min_date;
    this.til_dato = this.min_date;
  }

  tilbake() {
    history.push('/');
  }

  velg() {
    /* Fra- og til dato klart for å legges inn i lokalt array her. */
    cartService.setStartdato(this.fra_dato);
    cartService.setSluttdato(this.til_dato);
    varsel("Datoer er valgt");
    history.push('/kunde');
  }

  updateCalendar(evt) {
    switch (evt.target.name) {
      case 'til_dato':
        this.til_dato = evt.target.value;
        break;
      case 'fra_dato':
        this.fra_dato = evt.target.value;
        break;
    }
  }
}

export { Leieperiode };
