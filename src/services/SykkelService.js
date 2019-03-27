import { connection } from '../mysql_connection';

class SykkelService {
  getAvdelinger(success) {
    connection.query('select * from AVDELING', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  getSykkeltyper(success) {
    connection.query(
      'SELECT s.*, kl.klassenavn FROM SYKKELTYPE s, KLASSE kl  WHERE s.klasse_id = kl.klasse_id',
      (error, results) => {
        if (error) return console.error(error);
        success(results);
      }
    );
  }

  getSykkel(metode, navn, type, success) {
    switch (metode) {
      case 'navn':
        connection.query('select * from SYKKEL where navn like ?', [navn], (error, results) => {
          if (error) return console.error(error);

          success(results);
        });
        break;
      case 'type':
        connection.query('select * from SYKKEL where type like ?', [type], (error, results) => {
          if (error) return console.error(error);

          success(results);
        });
    }
  }

  getSykkelklasser(success) {
    connection.query('select * from KLASSE', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getAltOmSykkel(type_id, success) {
    connection.query(
      'select typenavn, hjul_storrelse, ramme_storrelse, girsystem, klasse_id, pris FROM SYKKELTYPE WHERE type_id=?',
      [type_id],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results);
        success(results[0]);
      }
    );
  }

  getKlasser(type_id, success) {
    connection.query(
      'SELECT klassenavn, info FROM KLASSE k, SYKKELTYPE s WHERE s.klasse_id = k.klasse_id AND type_id=?',
      [type_id],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results);
        success(results[0]);
      }
    );
  }

  getSykkelSorteringer() {
    let options = [];
    options[0] = ['Alfabetisk A-Z', 'alfAZ'];
    options[1] = ['Alfabetisk Z-A', 'alfZA'];
    options[2] = ['Pris, lav-høy', 'prisLH'];
    options[3] = ['Pris, høy-lav', 'prisHL'];
    return options;
  }

  sortSykkelsok(metode, arr, success) {
    //retuner en sortert array
    if (metode == 'Sorter etter') {
      //sender arr tilbake dersom ingen metode er valgt
      success(arr);
      return;
    }
    let index, r1, r2;
    let mulighet = this.getSykkelSorteringer();
    let nyArr = [];
    switch (metode) {
      case mulighet[0][0]: //alfabetisk A-Z
        index = 'typenavn';
        r1 = -1;
        r2 = 1;
        nyArr = arr.sort(sorteringfunk);
        break;
      case mulighet[1][0]: //alfabetisk Z-A
        index = 'typenavn';
        r1 = 1;
        r2 = -1;
        break;
      case mulighet[2][0]: //pris lav-høy
        index = 'pris';
        r1 = -1;
        r2 = 1;
        break;
      case mulighet[3][0]: //pris høy-lav
        index = 'pris';
        r1 = 1;
        r2 = -1;
    }
    nyArr = arr.sort(sorteringfunk);
    success(nyArr);

    function sorteringfunk(a, b) {
      //brukes for å sortere array med array
      if (a[index] < b[index]) {
        return r1;
      } else if (a[index] > b[index]) {
        return r2;
      }
      return 0;
    }
  }

  visKlasse(klasse, arrInn, success) {
    if (klasse.length == 0) {
      success(arrInn);
      return;
    }
    let arr = arrInn.slice(); //lager en klone av arrayen for ikke å endre den originale
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i].klassenavn !== klasse) {
        arr.splice(i, 1);
      }
    }
    success(arr);
  }

  visAvdeling(avdeling, arrInn, success) {
    if (avdeling.length == 0) {
      success(arrInn);
      return;
    }
    let arr = arrInn.slice();

    connection.query(
      'select * from SYKKELTYPE where type_id IN (select type_id from SYKKEL where avdeling_id IN (select avdeling_id from AVDELING where navn LIKE ?))',
      [avdeling],
      (error, results) => {
        if (error) return console.error(error);

        for (let i = arr.length - 1; i >= 0; i--) {
          let found = false;
          let k = results.length - 1;

          while (k >= 0 && !found) {
            if (arr[i].type_id == results[k].type_id) {
              found = true;
            }
            k--;
          }

          if (!found) {
            arr.splice(i, 1);
          }
        }
        success(arr);
      }
    );
  }
}

export let sykkelService = new SykkelService();
