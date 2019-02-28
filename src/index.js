import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';


class Home extends Component {
  render() {
    return <div>Home page</div>;
  }
}


ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
