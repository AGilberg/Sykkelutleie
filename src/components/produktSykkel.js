import * as React from 'react';
import { Component } from 'react-simplified';
import { sykkelService } from '../services/SykkelService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';

class ProduktSykkel extends Component {
  type = null;
  klasse = null;
  antall = 1;

  render() {
    if (!this.type || !this.klasse)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

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
                <h4>{this.type.typenavn}</h4>
                <div className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <h5>Produktinformasjon: </h5>
                    <li>{this.klasse.klassenavn}</li>
                    <li className="text">Pris: {this.type.pris} kr,-</li>
                    <br />
                    <div className="borderShadow">
                      <li>{this.klasse.info}</li>
                    </div>
                    <br />
                    <li>Girsystem: {this.type.girsystem}</li>
                    <li>Rammestørrelse: {this.type.ramme_storrelse} </li>
                    <li>Hjulstørrelse: {this.type.hjul_storrelse}</li>
                    <br />
                    <li>Lagerstatus: Antall sykler</li>
                    <li>
                      Antall:
                      <div className="input_div">
                        <input type="number" size="25" value={this.antall} id="count" style={{ marginRight: '20px' }} onChange={(event)=>{this.endreAntall("",event.target.value)}} />
                        <Button.Info onClick={()=>{this.endreAntall("minus")}}>
                          -
                        </Button.Info>
                        <Button.Info onClick={()=>{this.endreAntall("pluss")}}>
                          +
                        </Button.Info>
                      </div>
                    </li>
                    <li>Denne skal vise avdeling, men må hentes fra forrige eller kunne velges</li>
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
    sykkelService.getAltOmSykkel(this.props.match.params.id, type => {
      this.type = type;
    });

    sykkelService.getKlasser(this.props.match.params.id, klasse => {
      this.klasse = klasse;
    });
  }

  endreAntall(dir, inp) {
    switch (dir) {
      case "pluss": // FIXME: add limit to antall
        this.antall++;
        break;
      case "minus":
      if(this.antall > 1){
        this.antall--;
      }
      break;
      default://onchange// FIXME: add limit to antall
      if(inp < 1){
        this.antall = 1;
      }else{
        this.antall = inp;
      }
    }
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
