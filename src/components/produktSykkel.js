import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';

class ProduktSykkel extends Component {
  typer = null;
  avdelinger = null;
  klasse = [];

  render() {
    // if (!this.typer || !this.avdelinger || !this.klasse)
    //   return (
    //     <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
    //   );

    return (
      <div style={{ marginLeft: '20px' }}>
        {/* Visning av et enkelt produkt (sykler)*/}
        <br />
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img
                  style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                  src={'images/sykler/' + this.klasse.klassenavn + '.jpg'}
                />
              </div>
              <div className="col-9">
                {' '}
                <h4>Typenavn</h4>
                <div title="Produktinformasjon:" className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <li>Klassenavn</li>
                    <li className="text">Pris: PRIS kr,-</li>
                    <div className="borderShadow">
                      <li>
                        fijreaojgoeigjøaoigaoøithaithjaoei aeoigjø oaiejgøoaeiaerjgø
                        ioaejrgøoiajegøoairjtgøoaeijrgøoaeijrg aøoeigInfo
                      </li>
                    </div>
                    <br />
                    <li>Gir</li>
                    <li>Ramme</li>
                    <li>Hjul</li>
                    <br />
                    <li>Lagerstatus: Antall sykler</li>
                    <li>
                      Antall:
                      <div className="input_div">
                        <input type="text" size="25" value="1" id="count" style={{ marginRight: '20px' }} />
                        <Button.Info value="-" onclick={this.antall}>
                          -
                        </Button.Info>
                        <Button.Info value="+" onclick={this.antall}>
                          +
                        </Button.Info>
                      </div>
                    </li>
                    <li>Avdeling</li>
                  </ul>
                </div>
                <br />
              </div>
            </div>
          </div>
        </Card>
        <br />
        <div className="col-12">
          <Row>
            <Column left>
              <Button.Success onClick={this.save}>Legg til</Button.Success>
            </Column>
            <Column>
              <Button.Info onClick={this.handlekurv}>Til handlekurv</Button.Info>
            </Column>
            <Column right>
              <Button.Light onClick={this.back}>Tilbake</Button.Light>
            </Column>
          </Row>
        </div>
        <br />
      </div>
    );
  }
  mounted() {
    sykkelService.getType(this.props.match.params.id, typer => {
      this.typer = typer;
      console.log(this.typer);
    });
  }

  back() {
    history.push('/sykkel');
  }

  save() {
    history.push();
  }

  handlekurv() {
    history.push('/handlekurv');
  }
}

export { ProduktSykkel };
