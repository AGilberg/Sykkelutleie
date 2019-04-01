import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column, Form } from '../widgets';
import Button from 'react-bootstrap/Button';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';
import { kundeService } from '../services/KundeService.js';
import { sykkelService } from '../services/SykkelService.js';
import { utstyrService } from '../services/UtstyrService.js';

class BestillingEdit extends Component {
  bestill = null;
  sykkel = null;
  sykler = null;
  utstyr = null;
  utstyralle = null;
  status = null;

  render() {
    if (!this.bestill || !this.sykkel || !this.utstyr || !this.sykler || !this.utstyralle || !this.status) return null;

    return (
      <div>
        <Card title="Rediger bestilling">
          <Form.Label>Startdato:</Form.Label>
          <Form.Input
            type="text"
            value={this.bestill.leie_start}
            onChange={e => (this.bestill.leie_start = e.target.value)}
          />
          <Form.Label>Sluttdato:</Form.Label>
          <Form.Input
            type="text"
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
          <select key={this.bestill.bestilling_id} type="text" onChange={e => (this.bestill.tilstand = e.target.value)}>
            <option value="">{this.bestill.tilstand}</option>
            {this.status.map(status => (
              <option key={status.status_id}>{status.tilstand}</option>
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
                <select key={sykkel.innholdsykkel_id} onChange={e => (this.sykkel.typenavn = e.target.value)}>
                  <option value="">{sykkel.typenavn}</option>
                  {this.sykler.map(sykler => (
                    <option key={sykler.type_id}>{sykler.typenavn}</option>
                  ))}
                </select>
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
                <select key={utstyr.innholdutstyr_id} onChange={e => (this.utstyr.navn = e.target.value)}>
                  <option value="">{utstyr.navn}</option>
                  {this.utstyralle.map(utstyralle => (
                    <option key={utstyralle.utstyr_id}>{utstyralle.navn}</option>
                  ))}
                </select>
              ))}
            </Column>
          </Row>
          <br />
          <Row>
            <Column left>
              <div>Antall av det bestilte utstyret:</div>
            </Column>
          </Row>

          <Row>
            <Column left>
              {this.utstyr.map(utstyr => (
                <>
                  <div>{utstyr.navn + ': '}</div>
                  <Form.Input
                    key={utstyr.innholdutstyr_id}
                    onChange={e => (this.utstyr.ant_utstyr = e.target.value)}
                    type="number"
                    placeholder={utstyr.ant_utstyr}
                  />
                </>
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
    sykkelService.getSykkeltyper(sykler => {
      this.sykler = sykler;
    });
    utstyrService.getUtstyralle(utstyralle => {
      this.utstyralle = utstyralle;
    });
    bestillingService.tilstander(status => {
      this.status = status;
    });
  }

  save() {
    bestillingService.updateOrder(this.bestill, this.sykkel, this.utstyr, () => {
      history.push('/aktivebestillinger' + this.props.match.params.bestilling_id);
    });
  }

  tilbake() {
    history.push('/aktivebestillinger' + this.props.match.params.bestilling_id);
  }
}

export { BestillingEdit };
