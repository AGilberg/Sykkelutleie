import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List } from '../widgets';
import { NavLink } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';

class AktiveBestillinger extends Component {
  innhold = [];
  bestilling = [];
  bestillingsdato = '';
  beskrivelse = '';
  render() {
    return (
      <>
        {/* Visning av bestillinger som har status som aktiv (altså ikke tidligere gjennomførte leieforhold) */}
        <br />
        <Card title="Aktive bestillinger">
          <List>
            {this.bestilling.map(bestilling => (
              <List.Item key={bestilling.bestilling_id} to={'/aktivebestillinger/' + bestilling.bestilling_id}>
                {bestilling.beskrivelse}
              </List.Item>
            ))}
          </List>
        </Card>
      </>
    );
  }
  mounted() {
    bestillingService.getAktiveBestillinger(bestilling => {
      this.bestilling = bestilling;
    });
  }
}

export { AktiveBestillinger };
