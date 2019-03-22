import { connection } from '../mysql_connection';

class SykkelService{
  getSykkeltyper(success){
    connection.query(
      'SELECT s.*, kl.klassenavn FROM SYKKELTYPE s, KLASSE kl  WHERE s.klasse_id = kl.klasse_id',
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

  getSykkelklasser(success){
    connection.query(
      'select * from KLASSE',
        (error, results) => {
        if(error) return console.error(error);

        success(results);
      });
  }

  getSykkelSorteringer(){
    let options = [];
      options[0] = ["Alfabetisk A-Z", "alfAZ"];
      options[1] = ["Alfabetisk Z-A", "alfZA"];
      options[2] = ["Pris, lav-høy", "prisLH"];
      options[3] = ["Pris, høy-lav", "prisHL"];
    return options;
  }

  sortSykkelsok(metode, arr, success){//retuner en sortert array
    if(metode == "Sorter etter"){//sender arr tilbake dersom ingen metode er valgt
      success(arr);
      return;
    }
    let index, r1, r2;
    let mulighet = this.getSykkelSorteringer();
    let nyArr = [];
    switch (metode) {
      case mulighet[0][0]://alfabetisk A-Z
        index = "typenavn";
        r1 = -1;
        r2 = 1;
        nyArr = arr.sort(sorteringfunk);
        break;
      case mulighet[1][0]://alfabetisk Z-A
        index = "typenavn";
        r1 = 1;
        r2 = -1;
        break;
      case mulighet[2][0]://pris lav-høy
        index = "pris";
        r1 = -1;
        r2 = 1;
        break;
      case mulighet[3][0]://pris høy-lav
        index = "pris";
        r1 = 1;
        r2 = -1;

    }
      nyArr =  arr.sort(sorteringfunk);
      success(nyArr);

    function sorteringfunk(a, b) {//brukes for å sortere array med array
     if (a[index] < b[index]){
       return r1;
     }else if (a[index] > b[index]){
       return r2;
     }
     return 0;
   }
  }

  visKlasse(klasse, arrInn, success){
    if(klasse == "Sykkeltype"){
      success(arrInn);
      return;
    }
    let arr = arrInn.slice();//lager en klone av arrayen for ikke å endre den originale
    for(let i = arr.length-1; i >= 0; i--){
      if(arr[i].klassenavn !== klasse){
        arr.splice(i,1);
      }
    }
    success(arr);
  }
}

export let sykkelService = new SykkelService();
