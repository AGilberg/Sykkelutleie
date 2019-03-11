import { connection } from '../mysql_connection';

class CartService{
  /*tableHome => hvor produktet hører hjemme, SYKKEL, UTSTYR, ...
  cart[0] = [tableHome, colum1, colum2, colum3, colum4, colum5, ...];
  switch (tableHome) {
    case "tableName":
      correctRefister(cart[0][1],cart[0][2],cart[0][3],cart[0][4],...);
      break;
    default:

  }
  */
  constructor(){

  }

  removeCart(){

  }

  alterCart(){

  }

  addItem(item){

  }
}

export let cartService = new CartService();
