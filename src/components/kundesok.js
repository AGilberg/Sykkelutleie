import * as React from 'react';
import { Component } from 'react-simplified';
import { kundeService } from '../services/KundeService.js';
import { cartService } from '../services/CartService.js';
import { history } from '../index.js';
import { Button, Row, Column } from '../widgets';
import Card from 'react-bootstrap/Card';
import ReactLoading from 'react-loading';
import confirmBox from '../services/confirmBox';
import varsel from '../services/notifications.js';

class Kundesøk extends Component {
  kunder = null;

  render() {
    if (!this.kunder)
      return (
        <ReactLoading className="spinner fade-in" type="spinningBubbles" color="lightgrey" height="20%" width="20%" />
      );
    return (
      <div>
        {/* Søk etter registrerte kunder */}
        <br />
        <div className="col-md-12">
          <h4>Søk etter kunde</h4>
        </div>

        <div className="col-md-12">
          <br />
          <input
            type="text"
            className="shadow brRight"
            name="sok"
            style={{ border: '2px solid lightgrey', borderRadius: '4px', padding: '5px' }}
            id="sok"
            placeholder="Søk i kundedatabasen"
            onChange={this.sok}
          />
          <select
            id="kategori"
            className="shadow"
            style={{ border: '2px solid lightgrey', borderRadius: '4px', padding: '5px' }}
          >
            <option value="0">Navn</option>
            <option value="1">Epost</option>
            <option value="2">Telefon</option>
            <option value="3">Adresse</option>
            <option value="4">Fødselsdato</option>
          </select>
        </div>

        <div id="kunderesultat" style={{ padding: '12px', margin: '5px' }}>
          <div>
            {this.kunder.map(kunde => (
              <Card className="brBottom shadow" key={kunde.person_id}>
                <ul style={{ paddingTop: '15px' }}>
                  <li>Navn: {kunde.fornavn + ' ' + kunde.etternavn}</li>
                  <li>Mail: {kunde.mail}</li>
                  <li>Telefon: {kunde.tlf}</li>
                  <li>Adresse: {kunde.adresse + ' ' + kunde.post_nr + ' ' + kunde.sted}</li>
                  <li>Født: {this.formatDate(kunde.fodt)}</li>
                  <li>Kommentar: {kunde.kommentar}</li>
                </ul>
                <div>
                  <Row>
                    <Column right>
                      <Button.Success
                        onClick={() => {
                          this.velg(kunde);
                        }}
                      >
                        Velg Kunde
                      </Button.Success>
                    </Column>

                    <Column left>
                      <Button.Danger
                        onClick={()=>{this.slettKunde(kunde)}}
                        >
                          Slett kunde
                      </Button.Danger>
                    </Column>
                  </Row>
                </div>
                <br />
              </Card>
            ))}
          </div>
        </div>

        <br />
        <div className="col-md-12">
          <Button.Light name="tilbake" onClick={this.tilbake}>
            Tilbake
          </Button.Light>
        </div>
      </div>
    );
  }
  mounted() {
    kundeService.getKunder(kunder => {
      this.kunder = kunder;
    });
  }

// Søkefunksjon for å søke etter registrerte kunder
  sok() {
    var input, filter, type, div, ul, i, li, txt;
    input = document.getElementById('sok');
    filter = input.value.toUpperCase();
    type = document.getElementById('kategori').value; // Henter typekategori for søk
    div = document.getElementById('kunderesultat').children[0];
    ul = div.getElementsByTagName('ul');
    for (i = 0; i < this.kunder.length; i++) {
      li = ul[i].getElementsByTagName('li');
      txt = li[type].textContent || li[type].innerText;
      if (txt.toUpperCase().indexOf(filter) > -1) { // Fjerner case-sensitivitet
        ul[i].style.display = '';
        ul[i].closest('div.card').style.display = '';
      } else {
        ul[i].style.display = 'none';
        ul[i].closest('div.card').style.display = 'none'; // Fjerner kunder som ikke matcher
      }
    }
  }

  slettKunde(kunde){
    console.log(kunde);
    confirmBox("Varsel","Ønsker du å slette " + kunde.fornavn + " " + kunde.etternavn + "?", res=>{
      if(res == 1){
        console.log("SLETT EN KUNDE!, lag funk");
        varsel('Suksess!', 'Kunden ble slettet', 'vrsl-success');
      }
    });
  }

  velg(kunde) {
    cartService.setKunde(kunde);
    history.push('/sykkel');
  }

  tilbake() {
    history.push('/kunde');
  }
  formatDate(date) {
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day.toString();
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month.toString();
    }
    let year = date.getFullYear();

    return day + '/' + month + '/' + year;
  }
}

export { Kundesøk };
