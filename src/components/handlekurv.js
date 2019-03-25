import * as React from 'react';
import { Component } from 'react-simplified';
import { NavBar, Button } from '../widgets';
import { NavLink } from 'react-router-dom';
import { cartService } from '../services/CartService';
import ReactLoading from 'react-loading';

class Handlekurv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handlekurv: null
    };
  }

  delItem(index) {
    if (confirm('Er du sikker på at du vil slette produktet fra bestillingen?')) {
      cartService.dropItem(index);
      this.setState({ handlekurv: cartService.getHandlekurv() });
    }
  }

  render() {
    if (!this.state.handlekurv)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div style={{ margin: '24px', marginLeft: '0px', marginRight: '0px' }}>
        {/* Viser hva som er valgt til bestillingen */}
        <div className="col-md-4">
          <h4>Handlekurv</h4>
        </div>
        <br />
        <div className="container-fluid">
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
                <Button.Danger id="slett" onClick={() => this.delItem(index)}>
                  X
                </Button.Danger>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <NavBar.Link to="/utsjekk">
          <Button.Success>Utsjekk</Button.Success>

          <Button.Success>Utsjekk</Button.Success>
        </NavBar.Link>
      </div>
    );
  }

  mounted() {
    this.setState({ handlekurv: cartService.getHandlekurv() });
  }
}

export { Handlekurv };
