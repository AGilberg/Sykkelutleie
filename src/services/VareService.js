import { connection } from './mysql_connection';

class VareService{
  getVarer(success){
    connection.query(
      'select * from UTSTYR',
        (error, results) => {
        if(error) return console.error(error);

        success(results);
      });
  }
  getVare(metode, navn, sykkeltype){//søk etter en vare

  }
  getSorteringer(){
    let options = [];
    options[0] = ["Alfabetisk A-Z", "alfAZ"];
    options[1] = ["Alfabetisk Z-A", "alfZA"];
    options[2] = ["Pris, lav-høy", "prisLH"];
    options[3] = ["Pris, høy-lav", "prisHL"];
    return options;
  }
}


export let vareService = new VareService();
