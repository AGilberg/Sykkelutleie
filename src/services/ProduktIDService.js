import { connection } from '../mysql_connection';
import varsel from './notifications.js';

class ProduktIDService {
  getSykkelByID(sykkelid, success) {
    connection.query(
      'Select * FROM SYKKEL, SYKKELTYPE, AVDELING, KLASSE WHERE sykkel_id=? AND KLASSE.klasse_id=SYKKELTYPE.klasse_id AND SYKKEL.avdeling_id=AVDELING.avdeling_id AND SYKKEL.type_id=SYKKELTYPE.type_id',
      [sykkelid],
      (error, results) => {
        if (error) {
          varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
          return console.error(error);
        }
        success(results[0]);
      }
    );
  }
  updateSykkelByID(status, avdeling, sykkelid) {
    console.log(status, avdeling, sykkelid);
    connection.query(
      'UPDATE SYKKEL SET status_id=?, avdeling_id=? WHERE sykkel_id=?',
      [status, avdeling, sykkelid],
      (error, results) => {
        if (error) {
          varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
          return console.error(error);
        }
        console.log(results);
        varsel('Suksess!', 'Sykkelen er oppdatert', 'vrsl-success');
      }
    );
  }

  getEkstrautstyrByID(success) {
    connection.query('Select * FROM UTSTYR WHERE utstyr_id=?', (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }
      success(results);
    });
  }
}
export let produktIDService = new ProduktIDService();
