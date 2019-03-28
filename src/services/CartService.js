//import { connection } from '../mysql_connection';

class CartService{
  constructor(){
    this.handlekurv = [];
    this.startdato;//startdato for leieforholdet
    this.sluttdato;//sluttdato for leieforholdet
    this.kunde;//ansvarlig kunde,
    this.gruppe = {gruppe_id:null};//tilknyttet gruppe // FIXME: gjør det mulig å velge gruppe, eller fjern med antagelse om annen løsning
    this.beskrivelse = "KOMMENTAR FRA SERCIVE";//beskrivelse/kommentar til bestillingen // FIXME: gjør det mulig å legge til en kommentar/beskrivelse
    this.status = {status_id: 1, tilstand: 'OK'};// FIXME: gjør det mulig å velge status
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
}

export let cartService = new CartService();
