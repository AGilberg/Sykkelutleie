import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column, Form } from '../widgets';
import Button from 'react-bootstrap/Button';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';

class BestillingEdit extends Component {
  /* Skjema for redigering av en bestilling */
  bestill = null;
  sykkel = null;
  utstyr = null;
  status = null;
  pakke = null;

  render() {
    if (!this.bestill || !this.sykkel || !this.utstyr || this.pakke || !this.status) return null;

    return (
      <div className="main">
        <Card>
          <div className="col-md-4">
            <h4>Rediger bestilling: </h4>
          </div>
          <div className="container-fluid brBottom">
            <div className="row">
              <div className="col-8">
                <Form.Label>Startdato:</Form.Label>

                <Form.Input
                  type="date"
                  value={this.bestill.leie_start}
                  onChange={e => (this.bestill.leie_start = e.target.value)}
                />
                <Form.Label>Sluttdato:</Form.Label>
                <Form.Input
                  type="date"
                  value={this.bestill.leie_slutt}
                  onChange={e => (this.bestill.leie_slutt = e.target.value)}
                />
                <Form.Label>Fornavn:</Form.Label>
                <Form.Input
                  type="text"
                  value={this.bestill.fornavn}
                  onChange={e => (this.bestill.fornavn = e.target.value)}
                />
                <Form.Label>Etternavn:</Form.Label>
                <Form.Input
                  type="text"
                  value={this.bestill.etternavn}
                  onChange={e => (this.bestill.etternavn = e.target.value)}
                />
                <Form.Label>Samlet pris:</Form.Label>
                <Form.Input
                  type="number"
                  value={this.bestill.sum}
                  onChange={e => (this.bestill.sum = e.target.value)}
                />
                <br />
                <Form.Label>Status:</Form.Label>
                <br />
                <select value={this.bestill.status_id} onChange={e => (this.bestill.status_id = e.target.value)}>
                  {this.status.map(status => (
                    <option key={status.status_id} value={status.status_id}>
                      {status.tilstand}
                    </option>
                  ))}
                </select>
                <br />
                <br />
                <Form.Label>Beskrivelse:</Form.Label>
                <Form.Input
                  type="text"
                  value={this.bestill.beskrivelse}
                  onChange={e => (this.bestill.beskrivelse = e.target.value)}
                />

                <br />
                <Form.Label>Bestilte varer:</Form.Label>
                <br />
                <Form.Label>Sykler:</Form.Label>
                <br />

                <Row>
                  {/* Slette en sykkel fra bestillingen */}
                  <Column left>
                    {this.sykkel.map(sykkel => (
                      <Card key={sykkel.innholdsykkel_id}>
                        {sykkel.typenavn}
                        <br />
                        <Button variant="danger" onClick={e => this.deletesyk(sykkel.innholdsykkel_id)}>
                          Slett
                        </Button>
                      </Card>
                    ))}
                  </Column>
                </Row>
                <br />
                <Row>
                  <Column left>
                    <div>Utstyr:</div>
                  </Column>
                </Row>
                <Row>
                  {/* Slette utstyr fra bestillingen */}
                  <Column left>
                    {this.utstyr.map(utstyr => (
                      <Card key={utstyr.utstyr_id}>
                        {utstyr.navn} ({utstyr.ant_utstyr})
                        <br />
                        <Button variant="danger" onClick={e => this.deleteuts(utstyr.innholdutstyr_id)}>
                          Slett
                        </Button>
                      </Card>
                    ))}
                  </Column>
                </Row>
                <Row>
                  <Column left>
                    <div>Pakke:</div>
                  </Column>
                </Row>
                <Row>
                  {/* Slette Pakke fra bestillingen */}
                  <Column left>
                    {this.pakke.map(pakke => (
                      <Card key={pakke.pakke_id}>
                        {pakke.pakkenavn} ({pakke.pris})
                        <br />
                        <Button variant="danger" onClick={e => this.deletePakke(pakke.pakke_id)}>
                          Slett
                        </Button>
                      </Card>
                    ))}
                  </Column>
                </Row>
              </div>
            </div>
          </div>
        </Card>
        <br />
        <div>
          <Row>
            <Column>
              <Button variant="success" onClick={this.save}>
                Lagre
              </Button>
            </Column>
            <Column right>
              <Button variant="light" onClick={this.tilbake}>
                Tilbake
              </Button>
            </Column>
          </Row>
        </div>
      </div>
    );
  }

  mounted() {
    bestillingService.getOrder(this.props.match.params.bestilling_id, bestill => {
      this.bestill = bestill;
    });
    bestillingService.getOrderContentsSykler(this.props.match.params.bestilling_id, sykkel => {
      this.sykkel = sykkel;
    });
    bestillingService.getOrderContentsUtstyr(this.props.match.params.bestilling_id, utstyr => {
      this.utstyr = utstyr;
    });
    bestillingService.getOrderContentsPakke(this.props.match.params.bestilling_id, pakke => {
      this.pakke = pakke;
    });
    bestillingService.tilstander(status => {
      this.status = status;
    });
  }

  save() {
    bestillingService.updateOrder(this.bestill, this.sykkel, this.utstyr, this.pakke, () => {});
    history.push('/aktivebestillinger/');
  }

  tilbake() {
    history.push('/aktivebestillinger');
  }
  deletesyk(id) {
    bestillingService.deleteSykkel(id);
    {
      history.push('/aktivebestillinger');
    }
  }
  deleteuts(id) {
    bestillingService.deleteUtstyr(id);
    {
      history.push('/aktivebestillinger');
    }
  }
  deletepakke(id) {
    bestillingService.deletePakke(id);
    {
      history.push('/aktivebestillinger');
    }
  }
}

export { BestillingEdit };
