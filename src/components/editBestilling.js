import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, Form, Button } from '../widgets';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';
import { kundeService } from '../services/KundeService.js';
import ReactLoading from 'react-loading';
import { Kundesøk } from '../components/kundesok.js';

class BestillingEdit extends Component {
  bestill = null;
  sykkel = null;
  utstyr = null;

  tilstander = [];

  render() {
    if (!this.bestill || !this.sykkel || !this.utstyr)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div className="main">
        <Card title="Rediger bestilling">
          <Form.Label>Startdato:</Form.Label>
          <Form.Input
            type="text"
            value={this.formatDate(this.bestill.leie_start)}
            onChange={e => (this.bestill.leie_start = e.target.value)}
          />
          <Form.Label>Sluttdato:</Form.Label>
          <Form.Input
            type="text"
            value={this.formatDate(this.bestill.leie_slutt)}
            onChange={e => (this.bestill.leie_slutt = e.target.value)}
          />
          <Form.Label>Kunde:</Form.Label>
          <Kundesøk />
          <p>{this.bestill.fornavn + ' ' + this.bestill.etternavn}</p>
          <Form.Label>Samlet pris:</Form.Label>
          <Form.Input type="number" value={this.bestill.sum} onChange={e => (this.bestill.sum = e.target.value)} />

          <Form.Label>Status:</Form.Label>
          <Form.Input
            type="text"
            value={this.bestill.tilstand}
            onChange={e => (this.bestill.tilstand = e.target.value)}
          />

          <Form.Label>Beskrivelse:</Form.Label>
          <Form.Input
            type="text"
            value={this.bestill.beskrivelse}
            onChange={e => (this.bestill.beskrivelse = e.target.value)}
          />

          <Form.Label>Bestilte varer:</Form.Label>
          {this.sykkel.map(sykkel => (
            <p key={sykkel.innholdsykkel_id}>{sykkel.typenavn}</p>
          ))}
          <br />
          <Row>
            <Column left>
              <div>Utstyr:</div>
            </Column>
            <Column center>
              <div>Antall:</div>
            </Column>
          </Row>
          <Row>
            <Column left>
              {this.utstyr.map(utstyr => (
                <p key={utstyr.innholdutstyr_id}>{utstyr.navn}</p>
              ))}
            </Column>
            <Column right>
              {this.utstyr.map(utstyr => (
                <Form.Input
                  key={utstyr.innholdutstyr_id}
                  onChange={e => (this.utstyr.ant_utstyr = e.target.value)}
                  value={utstyr.ant_utstyr}
                  type="text"
                />
              ))}
            </Column>
          </Row>
        </Card>
        <div>
          <Row>
            <Column>
              <Button.Success onClick={this.save}>Lagre</Button.Success>
            </Column>
            <Column right>
              <Button.Light onClick={this.tilbake}>Tilbake</Button.Light>
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
  }

  save() {
    bestillingService.updateOrder(this.bestill, this.sykkel, this.utstyr, () => {
      history.push('/aktivebestillinger' + this.props.match.params.bestilling_id);
    });
  }

  tilbake() {
    history.push('/aktivebestillinger' + this.props.match.params.bestilling_id);
  }

  formatDate(date) {
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day.toString();
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month.toString();
    }
    let year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }
}

export { BestillingEdit };
