import { connection } from '../mysql_connection';

class SykkelService{
  getSykler(success){
    connection.query(
      'select * from SYKKELTYPE',
        (error, results) => {
        if(error) return console.error(error);
        success(results);
      });
  }

  getSykkel(metode, navn, type, success){
    switch (metode) {
      case "navn":
      connection.query(
        'select * from SYKKEL where navn like ?',[navn],
          (error, results) => {
          if(error) return console.error(error);

          success(results);
        });
        break;
      case "type":
      connection.query(
        'select * from SYKKEL where type like ?',[type],
          (error, results) => {
          if(error) return console.error(error);

          success(results);
        });
    }
  }
  sortSykkelSok(metode, sykkelArr){//retuner en sortert array
    switch (metode) {
      case "alfAZ":

        break;
      case "alfZA":
        break;
      case "prisLH":
        break;
      case "prisHL":
        break;
      default:// FIXME: FJERN FØR FERDIG?
        console.log("ingen metode valgt");
    }
      return sykkelArr;
  }

  getSykkelSorteringer(){
    let options = [];
      options[0] = ["Alfabetisk A-Z", "alfAZ"];
      options[1] = ["Alfabetisk Z-A", "alfZA"];
      options[2] = ["Pris, lav-høy", "prisLH"];
      options[3] = ["Pris, høy-lav", "prisHL"];
    return options;
  }

  getSykkelklasser(success){
    connection.query(
      'select * from KLASSE',
        (error, results) => {
        if(error) return console.error(error);

        success(results);
      });
  }
}

export let sykkelService = new SykkelService();
