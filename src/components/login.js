import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { history } from '../index.js';
import {cartService} from '../services/CartService';
import {loginService} from '../services/LoginService';

class Login extends Component{
  constructor(props){
    super(props);
    this.name = "";
    this.psw = "";

    this.login = this.login.bind(this);
  }
  login(){
    loginService.login(this.name, this.psw, res => {
      if(res){
        document.querySelector("div#loginCover").classList.add('js-hidden');
        history.push('/');
      }
    });
  }

  render(){
    return(
      <div className="confirmBox loginBox">
        <h2>Innlogging</h2>
        <div>
          <p>Brukernavn</p>
          <input type="text" onChange={() => {
            this.name = event.target.value.toString();
          }}/>
        </div>
        <div>
          <p>Passord</p>
          <input type="password" onChange={() => {
            this.psw = event.target.value.toString();
          }}/>
        </div>
        <div>
            <button onClick={this.login}>Log inn</button>
        </div>

      </div>
    );
  }
}

export default Login;
