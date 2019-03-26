import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';

class ProduktSykkel extends Component {
  typer = null;
  avdelinger = null;
  klasse = null;

  render() {
    if (!this.typer || !this.avdelinger || !this.klasser)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div className="main">
        {/* Visning av et enkelt produkt (sykler)*/}
        <br />
        <div className="col-md-4">
          <h4>Hei</h4>
        </div>
        <br />
        <div>
          <Card>
            <div className="container-fluid">
              <div className="row">
                <div className="col-3" />
                <img
                  style={{ width: '200px', height: '200px', border: '1px solid lightgrey', padding: '30px' }}
                  src={'images/sykler/' + this.typer + '.jpg'}
                />
                <div className="col-9">
                  {' '}
                  <h4>{this.klasse.klassenavn}</h4>
                  <Card title="Produktinformasjon:" style={{ margin: '24px', marginLeft: '0px', marginRight: '0px' }}>
                    <ul style={{ listStyleType: 'none' }}>
                      <li>Pris: {this.typer} kr</li>
                      <li>{this.avdelinger}</li>
                    </ul>
                  </Card>
                  <br />
                </div>
              </div>
            </div>
          </Card>
        </div>
        <br />
        <div className="col-12">
          <Row>
            <Column left>
              <Button.Success onClick={this.save}>Legg til</Button.Success>
            </Column>
            <Column right>
              <Button.Light onClick={this.back}>Tilbake</Button.Light>
            </Column>
          </Row>
        </div>
      </div>
    );
    {
      console.log(this.klasse);
    }
  }
  mounted() {
    sykkelService.getType(typer => {
      this.typer = typer;
      console.log(this.typer);
    });

    sykkelService.getAvdelinger(avdelinger => {
      this.avdelinger = avdelinger;
      console.log(this.avdelinger);
    });

    sykkelService.getSykkelklasser(klasse => {
      this.klasse = klasse;
      console.log(this.klasse);
    });
  }

  tilbake() {
    history.push('/sykkel');
  }

  save() {
    history.push('/handlekurv');
  }
}

export { ProduktSykkel };
