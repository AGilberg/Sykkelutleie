import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import { utstyrService } from '../services/UtstyrService.js';
import ReactLoading from 'react-loading';
import { cartService } from '../services/CartService.js'
import { varsel } from '../index.js';

class ProduktUtstyr extends Component {
  utstyr = null;
  avdelinger = null;
  antall = 1;

  render() {
    if (!this.utstyr || !this.avdelinger)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div style={{ marginLeft: '20px' }}>
        {/* Visning av et enkelt produkt (ekstrautstyr)*/}
        <br />
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img
                  style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                  src={'images/utstyr/' + this.utstyr.navn + '.jpg'}
                />
              </div>
              <div className="col-9">
                {' '}
                <h4>{this.utstyr.navn}</h4>
                <Card title="Produktinformasjon:" className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <li className="text">Pris: {this.utstyr.pris} kr,-</li>
                    <li>Lagerstatus: {this.utstyr.antall}</li>
                    <li>

                      <div className="input_div">
                        <input type="number" size="25" value={this.antall} id="count" style={{ marginRight: '20px' }} onChange={()=>{this.endreAntall("",event.target.value)}}/>
                        <Button.Info onClick={()=>{this.endreAntall("minus")}}>
                          -
                        </Button.Info>
                        <Button.Info onClick={()=>{this.endreAntall("pluss")}}>
                          +
                        </Button.Info>
                      </div>
                    </li>
                    <li>{this.avdelinger.navn}</li>
                  </ul>
                </Card>
                <br />
              </div>
            </div>
          </div>
        </Card>

        <br />
        <div className="col-12">
          <Row>
            <Column left>
              <Button.Success onClick={this.add}>Legg til bestilling</Button.Success>
            </Column>
            <Column>
              <Button.Info onClick={this.handlekurv}>Til handlekurv</Button.Info>
            </Column>
            <Column right>
              <Button.Light onClick={this.back}>Tilbake</Button.Light>
            </Column>
          </Row>
        </div>
      </div>
    );
  }

  mounted() {
    utstyrService.getUtstyrNavn(this.props.match.params.id, utstyr => {
      this.utstyr = utstyr;
    });

    utstyrService.getAvdelingNavn(this.props.match.params.id, avdeling => {
      this.avdelinger = avdeling;
    });
  }


  endreAntall(dir, inp) {
    switch (dir) {
      case "pluss":
      if(this.antall >= this.utstyr.antall){
        this.antall == this.utstyr.antall;
      }else{
        this.antall++;
      }
        break;
      case "minus":
      if(this.antall > 1){
        this.antall--;
      }
      break;
      default://onChange
        if(inp < 1){
          this.antall = 1;
        }else if(inp > this.utstyr.antall){
          this.antall = this.utstyr.antall;
        }else{
          this.antall = inp;
        }
    }
  }


  back() {
    history.push('/ekstrautstyr');
  }

  add() {
    let produkt = { id: this.utstyr.utstyr_id, navn: this.utstyr.navn, antall: this.antall, pris: this.utstyr.pris*this.antall };
    cartService.addItem(produkt);
    varsel.varsel("Produktet ble lagt til i handlekurven!");
    history.push('/ekstrautstyr');
  }
  handlekurv() {
    history.push('/handlekurv');
  }
}

export { ProduktUtstyr };
