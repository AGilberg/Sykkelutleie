import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column } from '../widgets';
import Button from 'react-bootstrap/Button';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';
import { kundeService } from '../services/KundeService.js';

class AktiveBestillinger extends Component {
  bestilling = [];
  beskrivelse = '';
  leie_start = '';

  render() {
    return (
      <div>
        {/* Visning av bestillinger som har status som aktiv (altså ikke tidligere gjennomførte leieforhold) */}
        <br />
        <Card title="Aktive bestillinger">
          <List>
            {this.bestilling.map(bestill => (
              <List.Item key={bestill.bestilling_id} to={'/aktivebestillinger/' + bestill.bestilling_id}>
                {bestill.beskrivelse}
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    );
  }
  mounted() {
    bestillingService.getAktiveBestillinger(bestilling => {
      this.bestilling = bestilling;
    });
  }
}

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
            <Column>{this.bestill.leie_start.toString()}</Column>
          </Row>
          <Row>
            <Column width={3}>Sluttdato:</Column>
            <Column>{this.bestill.leie_slutt.toString()}</Column>
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
}

export { AktiveBestillinger, BestillingDetails };
