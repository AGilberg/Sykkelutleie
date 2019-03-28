import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar, Button } from '../widgets';
import { NavLink } from 'react-router-dom';
import { cartService } from '../services/CartService';
import { bestillingService } from '../services/BestillingService';
import ReactLoading from 'react-loading';

class Handlekurv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlekurv: null
    }
    this.sum = 0;
    this.rabatt = false;
  }

  updateRabatt(){
    this.rabatt = !this.rabatt;
    this.updateSum();
  }

  updateSum(){
    let varer = cartService.getHandlekurv();
    this.sum = 0;
    for(let i = 0; i < varer.length; i++){
      this.sum+= varer[i].pris;
    }

    if(this.rabatt){
      this.sum*=0.95;// 5% i rabatt
    }
    this.sum = this.sum.toFixed(2);
  }

  delItem(index) {
    if (confirm('Er du sikker på at du vil slette produktet fra bestillingen?')) {
      cartService.dropItem(index);
      this.setState({ handlekurv: cartService.getHandlekurv() });
      this.updateSum();
    }
  }

  regBestilling(){// FIXME: legg til feilsjekk + annet?
    bestillingService.addOrder(this.sum, this.rabatt);
  }

  render() {
    if (!this.state.handlekurv)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div
        style={{
          margin: '24px',
          marginLeft: '0px',
          marginRight: '0px'
        }}
      >
        {/* Viser hva som er valgt til bestillingen */}
        <div className="col-md-4">
          <h4>Handlekurv</h4>
        </div>
        <br />
        <div
          className="container-fluid"
          style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' }}
        >
          <div className="row" style={{ backgroundColor: 'lavender', fontWeight: 'bold' }}>
            <div className="col">Nr.</div>
            <div className="col">Produktnavn</div>
            <div className="col">Antall</div>
            <div className="col">Pris</div>
            <div className="col" />
          </div>
          {this.state.handlekurv.map((prod, index) => (
            <div key={index} className="row" style={index % 2 != 0 ? { backgroundColor: 'lavender' } : {}}>
              <div className="col">{index + 1}</div>
              <div className="col">{prod.navn}</div>
              <div className="col">{prod.antall}</div>
              <div className="col">{prod.pris}</div>
              <div className="col">
                <Button.Info id="slett" onClick={() => this.delItem(index)}>
                  X
                </Button.Info>
              </div>
            </div>
          ))}
        </div>
        <div>Totalt: {this.sum} kr
          Rabatt<input type="checkbox" onChange={this.updateRabatt}/>
        </div>
        <br />
        <br />
        <NavBar.Link to="/utsjekk">
          <Button.Success onClick={this.regBestilling}>Register</Button.Success>
        </NavBar.Link>
      </div>
    );
  }

  mounted() {
    this.setState({ handlekurv: cartService.getHandlekurv() });
    this.updateSum();
  }
}

export { Handlekurv };
