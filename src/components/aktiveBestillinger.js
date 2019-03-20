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



export { AktiveBestillinger };
