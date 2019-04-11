import { connection } from '../mysql_connection';
import varsel from './notifications.js';

class PakkeService {
  getVarer(success) {
    connection.query('select * from UTSTYR', (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }

      success(results);
    });
  }
  getSorteringer() {
    let options = [];
    options[0] = ['Alfabetisk A-Z', 'alfAZ'];
    options[1] = ['Alfabetisk Z-A', 'alfZA'];
    options[2] = ['Pris, lav-høy', 'prisLH'];
    options[3] = ['Pris, høy-lav', 'prisHL'];
    return options;
  }
  getPakker(success) {
    connection.query('select * from PAKKE', (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }

      success(results);
      console.log("getPakker", results);
    });
  }

  getInnhold(pakkeinnhold_id, success) {
    connection.query('select * from PAKKEINNHOLD where pakkeinnhold_id = ?', [pakkeinnhold_id], (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }

      success(results);
      console.log("getInnhold", results);
    });
  }
  getPakke(pakke_id, success) {
    connection.query('select * from PAKKE where PAKKE.pakke_id =?', [pakke_id], (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }

      success(results);
      console.log(results);
    });
  }
  getPakkeinnholdsykler(pakke_id, success) {
    connection.query(
      'select * from PAKKEINNHOLD, PAKKE, SYKKELTYPE where PAKKEINNHOLD.pakke_id = ? and PAKKEINNHOLD.pakke_id = PAKKE.pakke_id and SYKKELTYPE.type_id = PAKKEINNHOLD.type_id',
      [pakke_id],
      (error, results) => {
        if (error) {
          varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
          return console.error(error);
        }

        success(results);
        console.log(results);
      }
    );
  }
  getPakkeinnholdutstyr(pakke_id, success) {
    connection.query(
      'select * from PAKKEINNHOLD, PAKKE, UTSTYR where PAKKEINNHOLD.pakke_id = ? and PAKKEINNHOLD.pakke_id = PAKKE.pakke_id and UTSTYR.utstyr_id = PAKKEINNHOLD.utstyr_id',
      [pakke_id],
      (error, results) => {
        if (error) {
          varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
          return console.error(error);
        }

        success(results);
        console.log(results);
      }
    );
  }
}

export let pakkeService = new PakkeService();
