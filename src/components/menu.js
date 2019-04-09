import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, List, Row, Column, NavBar, Button, Form } from '../widgets';
import { history } from '../index.js';
import { loginService } from '../services/LoginService';


class Menu extends Component {
  // mounted(){// FIXME: legg til for å bruke innloggingen og utlogging, IKKE FJERN
  //   if(!cartService.getIsLoggedInn()){
  //    document.getElementById("loginCover").classList.remove('js-hidden');
  //     history.push('/login');
  //   }
  // }

  render() {
    return (
      <div
        className="col bg-light"
        style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' }}
      >
        <div id="loginCover" className="js-cover js-hidden" />
        <NavBar
          brand=<img
            src="images/sykkelutleie.jpg"
            onClick={() => history.push('/')}
            alt="logo"
            style={{ width: '256.4px', height: '70px' }}
          />
        >
          <NavBar.Link to="/aktivebestillinger">Alle bestillinger</NavBar.Link>
          <NavBar.Link to="/ansatt">Ansatt</NavBar.Link>

           <NavBar.Link to="/sykkelID">Avvik</NavBar.Link>
           <div className="js-hidden" id="leieperiode" />

           <div
             style={{
               color: 'rgba(0, 0, 0, 0.5)',
               fontSize: '18px',
               marginTop: '5px',
               position: 'absolute',
               right: '10px',
               padding: '8px',
               paddingBottom: '12px',
               fontWeight: 'bold'
             }}
           >
             <Button.Info onClick={loginService.logout}>Logg ut</Button.Info>
           </div>
        </NavBar>
      </div>
    );
  }
}

export default Menu;
