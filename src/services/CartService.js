import { connection } from '../mysql_connection';

class CartService{
  constructor(){
    this.handlekurv = [
      { id: 2, navn: 'hjelm', antall: 1, pris: 150 },
      { id: 3, navn: 'sykkel', antall: 1, pris: 900 },
      { id: 1, navn: 'vannflaske', antall: 3, pris: 75 },
      { id: 2, navn: 'luftpumpe', antall: 1, pris: 150 }
    ];
  }


  removeCart(){
    this.handlekurv = [];
  }

  alterCart(){//index i arrayen,

  }

  dropItem(start){//index i arrayen,
    console.log(this.handlekurv);
        this.handlekurv.slice(start,1);
        console.log(this.handlekurv);
  }

  addItem(item){
    this.handlekurv.push(item);
  }

  getHandlekurv(){
    return this.handlekurv;
  }
}

export let cartService = new CartService();
