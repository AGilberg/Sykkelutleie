import { connection } from '../mysql_connection';

class CartService{
  constructor(){
    this.handlekurv = [//varene i bestillingen
      { id: 2, navn: 'test-1', antall: 1, pris: 150 },
      { id: 3, navn: 'test-2', antall: 1, pris: 900 },
      { id: 1, navn: 'test-3', antall: 3, pris: 75 },
      { id: 2, navn: 'test-4', antall: 1, pris: 150 }
    ];
    this.start;//startdato for leieforholdet
    this.slutt;//sluttdato for leieforholdet
    this.kunde;//ansvarlig kunde,
  }
/*TESTDATA
{ id: 2, navn: 'hjelm', antall: 1, pris: 150 },
{ id: 3, navn: 'sykkel', antall: 1, pris: 900 },
{ id: 1, navn: 'vannflaske', antall: 3, pris: 75 },
{ id: 2, navn: 'luftpumpe', antall: 1, pris: 150 }
*/

  removeCart(){
    this.handlekurv = [];
  }

  alterCart(){//index i arrayen,

  }

  dropItem(start){//index i arrayen,
    this.handlekurv.splice(start, 1);
  }

  addItem(item){

    this.handlekurv.push(item);
  }

  getHandlekurv(){
    return this.handlekurv;
  }
}

export let cartService = new CartService();
