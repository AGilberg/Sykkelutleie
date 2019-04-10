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

  render() {
    if (!this.pakkeinnhold)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );

    return <div>{pakkeinnhold.pakke_id}</div>;
  }
  mounted() {
    vareService.getPakkeinnhold(this.props.match.params.pakke_id, pakkeinnhold => {
      this.pakkeinnhold = pakkeinnhold;
    });
  }

  back() {
    history.push('/pakker');
  }
}

export { Pakkevisning };
