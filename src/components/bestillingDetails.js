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
  innhold = null;

  render() {
    if (!this.bestill || !this.innhold) return null;

    return (
      <div className="hoved">
        <Card title="Om bestillingen:">
          <Row>
            <Column width={3}>Startdato:</Column>
            <Column>{this.formateDate(this.bestill.leie_start)}</Column>
          </Row>
          <Row>
            <Column width={3}>Sluttdato:</Column>
            <Column>{this.formateDate(this.bestill.leie_slutt)}</Column>
          </Row>
          <Row>
            <Column width={3}>Kunde:</Column>
            <Column>{this.bestill.fornavn}</Column>
          </Row>
          <Row>
            <Column width={3}>Samlet pris:</Column>
            <Column>{this.bestill.sum},-</Column>
          </Row>
          <Row>
            <Column width={3}>Beskrivelse:</Column>
            <Column>{this.bestill.beskrivelse}</Column>
          </Row>
          <Row>
            <Column width={3}>Bestilte varer:</Column>
            <Column>
              {this.innhold.map(innhold => (
                <Row key={innhold.innhold_id}>
                  <ul>
                    <li>{innhold.typenavn}</li>
                    <li>
                      {innhold.navn} ({innhold.ant_utstyr})
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
    bestillingService.getOrderContents(this.props.match.params.bestilling_id, innhold => {
      this.innhold = innhold;
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
