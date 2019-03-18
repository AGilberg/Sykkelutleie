import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column } from '../widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';

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

  render() {
    if (!this.bestill) return null;

    return (
      <div>
        <Card title="Om bestillingen">
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
            <Column />
          </Row>
          <Row>
            <Column width={3}>Samlet pris:</Column>
            <Column />
          </Row>
          <Row>
            <Column width={3}>Beskrivelse:</Column>
            <Column>{this.bestill.beskrivelse}</Column>
          </Row>
          <Row>
            <Column width={3}>Bestilte varer:</Column>
            <Column />
          </Row>
        </Card>
      </div>
    );
  }
  mounted() {
    bestillingService.getOrder(this.props.match.params.bestilling_id, bestill => {
      this.bestill = bestill;
    });
  }
}

export { AktiveBestillinger, BestillingDetails };
