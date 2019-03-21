import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column } from '../widgets';
import Button from 'react-bootstrap/Button';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';
import { kundeService } from '../services/KundeService.js';

class BestillingDetails extends Component {
  bestill = null;
  sykkel = null;
  utstyr = null;

  render() {
    if (!this.bestill || !this.sykkel || !this.utstyr) return null;

    return (
      <div className="hoved">
        <Card title="Om bestillingen:">
          <Card>
            <Row>
              <Column width={3}>Startdato:</Column>
              <Column>{this.formateDate(this.bestill.leie_start)}</Column>
            </Row>
            <br />
            <Row>
              <Column width={3}>Sluttdato:</Column>
              <Column>{this.formateDate(this.bestill.leie_slutt)}</Column>
            </Row>
            <br />
            <Row>
              <Column width={3}>Kunde:</Column>
              <Column>{this.bestill.fornavn}</Column>
            </Row>
            <br />
            <Row>
              <Column width={3}>Samlet pris:</Column>
              <Column>{this.bestill.sum},-</Column>
            </Row>
            <br />
            <Row>
              <Column width={3}>Status:</Column>
              <Column>{this.bestill.tilstand}</Column>
            </Row>
            <br />
            <Row>
              <Column width={3}>Beskrivelse:</Column>
              <Column>{this.bestill.beskrivelse}</Column>
            </Row>

            <br />
            <br />
            <Row>
              <Column width={3}>Bestilte varer:</Column>
              <Column>
                {this.sykkel.map(sykkel => (
                  <Row key={sykkel.innholdsykkel_id}>
                    <ul>
                      <li>{sykkel.typenavn}</li>
                    </ul>
                  </Row>
                ))}
              </Column>
              <Column>
                {this.utstyr.map(utstyr => (
                  <Row key={utstyr.innholdutstyr_id}>
                    <ul>
                      <li>
                        {utstyr.navn} ({utstyr.ant_utstyr})
                      </li>
                    </ul>
                  </Row>
                ))}
              </Column>
            </Row>
            <div>
              <br />
              <Row>
                <Column right>
                  <Button id="slett" variant="danger">
                    Slett bestilling
                  </Button>
                </Column>
                <Column left>
                  <Button id="endre" variant="success">
                    Endre bestilling
                  </Button>
                </Column>
              </Row>
            </div>
          </Card>
        </Card>
        <div>
          <br />
          <Row>
            <Column right>
              <Button id="tilbake" variant="light" onClick={this.tilbake}>
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
  }

  tilbake() {
    history.push('/aktivebestillinger');
  }

  formateDate(date) {
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

export { BestillingDetails };
