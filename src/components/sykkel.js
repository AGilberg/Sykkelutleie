import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

class Sykkel extends Component {
  pris = '';
  typenavn = '';
  info = '';
  tilstand = '';
  hjul_storrelse = '';
  ramme_storrelse = '';
  girsystem = '';
  valgtSortering = '';
  valgtKlasse = '';
  sykler = [];
  sorteringer = [];
  sykkelklasser = [];

  render() {
    return (
      <>
        {/*Skjema for søk og valg av sykkel*/}
        <br />
        <div className="col-md-4">
          <h4>Velg sykkel</h4>
        </div>
        <div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="sorter"
                name="sorter"
                className="form-control"
                onChange={event => (this.valgtSortering = event.target.value)}
              >
                <option>Sorter etter</option>
                {this.sorteringer.map(metode => (
                  <option key={metode[1]}>{metode[0]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-4">
              <select
                id="typenavn"
                name="typenavn"
                className="form-control"
                onChange={event => (this.valgtKlasse = event.target.value)}
              >
                <option>Sykkeltype</option>
                {this.sykkelklasser.map(klasse => (
                  <option key={klasse.klasse_id}>{klasse.klassenavn}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <CardDeck id="sykkelvisning">
          {this.sykler.map(sykkel => (
            <div key={sykkel.type_id}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="images/test.png" />
                <Card.Body>
                  <Card.Title>{sykkel.typenavn}</Card.Title>
                  <Card.Text>
                    Hjulstørrelse: {sykkel.hjul_storrelse}<br />
                    Rammestørrelse: {sykkel.ramme_storrelse}<br />
                    Girsystem: {sykkel.girsystem}<br />
                    Klasse: {sykkel.klasse_id}
                  </Card.Text>
                  <Button variant="primary">Legg til i handlekurv</Button>
                </Card.Body>
              </Card>
              <br />
            </div>
          ))}
        </CardDeck>
      </>
    );
  }
  mounted() {
    //de to kallene med SQL gir feilmeldingen
    this.sorteringer = sykkelService.getSykkelSorteringer();

    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    sykkelService.getSykkelklasser(klasser => {
      this.sykkelklasser = klasser;
    });
  }
}

export { Sykkel };
