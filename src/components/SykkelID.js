import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, Button, Form } from '../widgets';
import { produktIDService } from '../services/ProduktIDService.js';
import { sykkelService } from '../services/SykkelService.js';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { bestillingService } from '../services/BestillingService.js';
import varsel from '../services/notifications.js';

class SykkelID extends Component {
  sykkelid = [];
  info = null;
  status = [];
  avdeling = [];
  standard = (
    <div>
      <h4>Sykkel ID: </h4>
      <div className="brBottom">
        <input
          id="id"
          name="id"
          type="number"
          placeholder="ID"
          className="form-control input-md shadow"
          onChange={event => (this.sykkelid = event.target.value)}
          required
        />
      </div>
      <Row>
        <Column left>
          <Button.Light
            onClick={() => {
              this.sok(this.sykkelid);
            }}
          >
            Søk
          </Button.Light>
        </Column>
        <Column right>
          <Button.Success onClick={this.oppdater}>Lagre endringer</Button.Success>
        </Column>
      </Row>
    </div>
  );

  render() {
    if (this.info !== null) {
      return (
        <div className="main">
          <Card>
            <div className="col-md-6" style={{ margin: '30px' }}>
              {this.standard}
              <div style={{ marginTop: '50px' }}>
                <Row>
                  <Column />
                </Row>

                <Row>
                  <Column>
                    <div> Avdeling: {this.info.avdeling_id} </div>
                    <Form.Label>Nå avdeling: </Form.Label>
                    <br />
                    <select
                      className="brBottom kundeinput"
                      id="avdSel"
                      value={this.info.avdeling_id}
                      onChange={() => {
                        this.updateAvdeling(event);
                      }}
                    >
                      {this.avdeling.map(avdeling => (
                        <option key={avdeling.naa_avdeling_id} id={avdeling.naa_avdeling_id}>
                          {avdeling.navn}
                        </option>
                      ))}
                    </select>

                    <div> Status: {this.info.status_id} </div>
                    <Form.Label>Status: </Form.Label>
                    <br />
                    <select
                      className="kundeinput"
                      value={this.info.status_id}
                      onChange={e => (this.info.status_id = e.target.value)}
                    >
                      {this.status.map(status => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.tilstand}
                        </option>
                      ))}
                    </select>
                  </Column>
                </Row>
              </div>
            </div>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="main">
          <Card>
            <div className="col-md-6" style={{ margin: '30px' }}>
              {this.standard}
            </div>
          </Card>
        </div>
      );
    }
  }

  sok(id) {
    if (id.length == 0) {
      varsel('OBS!', 'Ikke gyldig søk', 'vrsl-danger');
      return;
    }
    produktIDService.getSykkelByID(id, success => {
      if (success === undefined) {
        this.info = null;
        varsel('OBS!', 'Ingen treff', 'vrsl-success');
      } else {
        this.info = success;
      }
    });
    bestillingService.tilstander(status => {
      this.status = status;
    });
    sykkelService.getAvdelinger(avdeling => {
      this.avdeling = avdeling;
    });
  }
  oppdater() {
    if (this.info !== null) {
      produktIDService.updateSykkelByID(this.info.status_id, this.info.naa_avdeling_id, this.sykkelid);
    } else {
      varsel('Feil!', 'Ingen sykkel valgt', 'vrsl-danger');
    }
  }
  updateAvdeling(e) {
    let sel = document.getElementById(e.target.id);
    this.info.naa_avdeling_id = sel[sel.selectedIndex].id;
  }
}
export { SykkelID };
