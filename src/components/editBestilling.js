import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column, Form } from '../widgets';
import Button from 'react-bootstrap/Button';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';

class BestillingEdit extends Component {
  bestill = null;
  sykkel = null;
  utstyr = null;
  status = null;

  render() {
    if (!this.bestill || !this.sykkel || !this.utstyr || !this.status) return null;

    return (
      <div>
        <Card title="Rediger bestilling">
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
          <Form.Input type="number" value={this.bestill.sum} onChange={e => (this.bestill.sum = e.target.value)} />
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
            <Column left>
              {this.sykkel.map(sykkel => (
                <Card key={sykkel.innholdsykkel_id}>
                  {sykkel.typenavn}

                  <Button variant="danger" onClick={this.delete}>
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
            <Column left>
              {this.utstyr.map(utstyr => (
                <Card key={utstyr.utstyr_id}>
                  {utstyr.navn} ({utstyr.ant_utstyr})
                </Card>
              ))}
            </Column>
          </Row>
        </Card>
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
    bestillingService.tilstander(status => {
      this.status = status;
    });
  }

  save() {
    bestillingService.updateOrder(this.bestill, this.sykkel, this.utstyr, () => {});
    history.push('/aktivebestillinger/');
  }

  tilbake() {
    history.push('/aktivebestillinger');
  }
  delete() {
    bestillingService.deleteSykkel(this.props.match.params.bestilling_id, () => {});
  }
}

export { BestillingEdit };
