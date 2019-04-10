import * as React from 'react';
import { Component } from 'react-simplified';
import { vareService } from '../services/VareService.js';
import { Card, Row, Column, Button } from '../widgets';
import { history } from '../index.js';
import ReactLoading from 'react-loading';
import { cartService } from '../services/CartService.js';
import varsel from '../services/notifications.js';

class Pakkevisning extends Component {
  pakkeinnhold = null;
  pakke = null;

  render() {
    if (!this.pakkeinnhold || !this.pakke)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return (
      <div>
        <Card>
          <div className="container-fluid">
            <div className="row">
              <div className="col-3">
                <img
                  style={{ width: '200px', height: '200px', marginTop: '30px', marginRight: '15px' }}
                  src={'images/pakke/' + this.pakke.pakkenavn + '.jpg'}
                />
              </div>
              <div className="col-9">
                {' '}
                <h4>{this.pakke.pakkenavn}</h4>
                <div className="ramme">
                  <ul style={{ listStyleType: 'none' }}>
                    <h5>Produktinformasjon: </h5>
                    <li>ting</li>
                    <li className="PrisText">Pris: {this.pakke.pris} kr,-</li>
                    <br />
                    <div className="borderShadow">
                      <li>beskrivelse</li>
                    </div>
                    <br />
                    <h5>Detaljer: </h5>
                  </ul>
                </div>
                <br />
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
  mounted() {
    vareService.getPakkeinnhold(this.props.match.params.pakke_id, pakkeinnhold => {
      this.pakkeinnhold = pakkeinnhold;
    });
    vareService.getPakke(this.props.match.params.pakke_id, pakke => {
      this.pakke = pakke;
    });
  }

  back() {
    history.push('/pakker');
  }
}

export { Pakkevisning };
