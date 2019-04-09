import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from '../services/BestillingService.js';
import { kundeService } from '../services/KundeService.js';
import ReactLoading from 'react-loading';
import formatDate from '../services/formatDate.js';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class AktiveBestillinger extends Component {
  bestilling = null;
  fullfortbest = null;

  render() {
    if (!this.bestilling || !this.fullfortbest)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div className="main">
        <Tabs defaultActiveKey="aktiveBestillinger" id="bestillingTabs">
          <Tab eventKey="aktiveBestillinger" title="Aktive bestillinger" className="doubleBr">
            {/* Visning av bestillinger som ikke har status som fullført */}
            <Row>
              <Column>BestillingsID</Column>
              <Column>Kunde</Column>
              <Column>Leie fra</Column>
              <Column>Leie til</Column>
            </Row>
            <List>
              {this.bestilling.map(bestill => (
                <List.Item key={bestill.bestilling_id} to={'/aktivebestillinger/' + bestill.bestilling_id}>
                  <Row>
                    <Column>{bestill.bestilling_id}</Column>
                    <Column>
                      {bestill.fornavn} {bestill.etternavn}
                    </Column>
                    <Column>{formatDate(bestill.leie_start)}</Column>
                    <Column>{formatDate(bestill.leie_slutt)}</Column>
                  </Row>
                </List.Item>
              ))}
            </List>
          </Tab>

          <Tab eventKey="fullforteBestillinger" title="Fullførte bestillinger">
            {/* Visning av bestillinger som har status som fullført */}
            <Row>
              <Column>BestillingsID</Column>
              <Column>Kunde</Column>
              <Column>Leie fra</Column>
              <Column>Leie til</Column>
            </Row>
            <List>
              {this.fullfortbest.map(bestill => (
                <List.Item key={bestill.bestilling_id} to={'/aktivebestillinger/' + bestill.bestilling_id}>
                  <Row>
                    <Column>{bestill.bestilling_id}</Column>
                    <Column>
                      {bestill.fornavn} {bestill.etternavn}
                    </Column>
                    <Column>{formatDate(bestill.leie_start)}</Column>
                    <Column>{formatDate(bestill.leie_slutt)}</Column>
                  </Row>
                </List.Item>
              ))}
            </List>
          </Tab>
        </Tabs>
      </div>
    );
  }
  mounted() {
    bestillingService.getAktiveBestillinger(bestilling => {
      this.bestilling = bestilling;
    });
    bestillingService.getFullforteBestillinger(fullfortbest => {
      this.fullfortbest = fullfortbest;
    });
  }
}

export { AktiveBestillinger };
