import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import DropdownList from 'react-widgets/lib/DropdownList'


export class extends Card Component {
render(){
return (
  <div clas></div>
<Card></Card>

)}
}
//Main title, to
class Name extends Component {
render() {
return this.props.to ?(
  <NavLink></NavLink>

) }
}

class ListItems extends Component {
render(){
return(
<div>
  <ul>
  <li></li>
  </ul></div>
)
}
}

//Green button, onClick
class ButtonSuccess extends Component {
  render() {
    return (
      <button type="button" className="btn btn-success" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Renders a danger button using Bootstrap styles
// Attributes: onClick
class ButtonDanger extends Component {
  render() {
    return (
      <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

//Light button, onClick
class ButtonLight extends Component {
  render() {
    return (
      <button type="button" className="btn btn-light" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

// Renders a button using Bootstrap styles
export class Button {
  static Success = ButtonSuccess;
  static Danger = ButtonDanger;
  static Light = ButtonLight;
}

// Renders a form label using Bootstrap styles
class FormLabel extends Component {
  render() {
    return <label className="col-form-label">{this.props.children}</label>;
  }
}

// Renders a form input using Bootstrap styles
// Attributes: type, value, onChange, required, pattern
class FormInput extends Component {
  render() {
    return (
      <input
        className="form-control"
        type={this.props.type}
        value={this.props.value}
        onChange={this.props.onChange}
        required={this.props.required}
        pattern={this.props.pattern}
      />
    );
  }
}

// Renders form components using Bootstrap styles
export class Form {
  static Label = FormLabel;
  static Input = FormInput;
}
