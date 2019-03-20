import * as React from 'react';
import { Component } from 'react-simplified';
import { kundeService } from '../services/KundeService.js';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();
import Card from 'react-bootstrap/Card';

class Kundesøk extends Component {
  kunder = [];

  render() {
    return (
      <div className="main">
        {/* Søkefunksjon for å søke etter registrerte kunder */}
        <br />
        <div className="col-md-4">
          <h4>Søk etter kunde</h4>
        </div>

        <div className="col-md-4">
          <br />
          <input type="text" name="sok" id="sok" placeholder="Søk i kundedatabasen" onChange={this.sok} />
          <select id="kategori">
            <option value="0">Navn</option>
            <option value="1">Epost</option>
            <option value="2">Telefon</option>
            <option value="3">Adresse</option>
            <option value="4">Fødselsdato</option>
          </select>
        </div>
        <div id="kunderesultat">
          <div>
            {this.kunder.map(kunde => (
              <Card key={kunde.person_id}>
                <ul>
                  <li>Navn: {kunde.fornavn + ' ' + kunde.etternavn}</li>
                  <li>Mail: {kunde.mail}</li>
                  <li>Telefon: {kunde.tlf}</li>
                  <li>Adresse: {kunde.adresse + ' ' + kunde.post_nr + ' ' + kunde.sted}</li>
                  <li>Født: {this.formatDate(kunde.fodt)}</li>
                  <li>Kommentar: {kunde.kommentar}</li>
                </ul>
              </Card>
            ))}
          </div>
        </div>
        <br />
        <div className="col-md-4">
          <button id="tilbake" name="tilbake" className="btn btn-light" onClick={this.tilbake}>
            Tilbake
          </button>
        </div>
      </div>
    );
  }
  mounted() {
    kundeService.getKunder(kunder => {
      this.kunder = kunder;
    });
  }

  sok() {
    var input, filter, type, div, ul, i, li, txt;
    input = document.getElementById('sok');
    filter = input.value.toUpperCase();
    type = document.getElementById('kategori').value;
    div = document.getElementById('kunderesultat').children[0];
    ul = div.getElementsByTagName('ul');
    for (i = 0; i < this.kunder.length; i++) {
      li = ul[i].getElementsByTagName('li');
      txt = li[type].textContent || li[type].innerText;
      if (txt.toUpperCase().indexOf(filter) > -1) {
        ul[i].style.display = '';
      } else {
        ul[i].style.display = 'none';
      }
    }
  }

  tilbake() {
    history.push('/kunde');
  }
  formatDate(date){
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return day + "/" + month + "/" + year;
  }
}

export { Kundesøk };
