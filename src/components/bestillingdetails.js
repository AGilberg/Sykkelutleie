import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { Card, List, Row, Column } from '../widgets';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';

class BestillingDetails extends Component {
  bestill = null;

  render() {
    if (!this.bestill) return null;

    return (
      <div>
        <Card title="Om bestillingen">
          <Row>
            <Column width={2}>Startdato:</Column>
          </Row>
          <Row>
            <Column width={2}>Bestilte varer:</Column>
            <Column>{this.bestill.beskrivelse}</Column>
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

export { BestillingDetails };
