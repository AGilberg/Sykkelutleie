//import { connection } from '../mysql_connection';

class CartService{
  constructor(){
    this.handlekurv = [//varene i bestillingen
      { id: 2, navn: 'test-1', antall: 1, pris: 150 },
      { id: 3, navn: 'test-2', antall: 1, pris: 900 },
      { id: 1, navn: 'test-3', antall: 3, pris: 75 },
      { id: 2, navn: 'test-4', antall: 1, pris: 150 }
    ];
    this.startdato;//startdato for leieforholdet
    this.sluttdato;//sluttdato for leieforholdet
    this.kunde;//ansvarlig kunde,
    this.gruppe;//tilknyttet gruppe
    this.beskrivelse;//beskrivelse/kommentar til bestillingen
    this.status;
  }

  getHandlekurv(){
    return this.handlekurv;
  }

  getStartdato(){
    return this.startdato;
  }

  getSluttdato(){
    return this.sluttdato;
  }

  getKunde(){
    return this.kunde;
  }

  getGruppe(){
    return this.gruppe;
  }

  getBeskrivelse(){
    return this.beskrivelse;
  }

  getStatus(){
    return this.status;
  }

  setStartdato(dato){
    this.startdato = dato;
  }

  setSluttdato(dato){
    this.sluttdato = dato;
  }

  setKunde(kunde){
    this.kunde = kunde;
  }

  setGruppe(gruppe){
    this.gruppe = gruppe;
  }

  setStatus(status){
    this.status = status;
  }

  setBeskrivelse(text){
    this.beskrivelse = text;
  }

  dropCart(){//slett hele handlekurven
    this.handlekurv = [];
  }

  alterCart(){//index i arrayen,// FIXME: fjern?

  }

  dropItem(index){//fjern en vare fra handlekurven
    this.handlekurv.splice(index, 1);
  }

  addItem(item){//legg til et produkt i handlekurven
    this.handlekurv.push(item);
  }

  setKunde(kunde){
    this.kunde = kunde;
  }
}

export let cartService = new CartService();
