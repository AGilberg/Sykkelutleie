import { connection } from '../mysql_connection';
import varsel from './notifications.js';

class ProduktIDService {
    getSykkelByID(sykkelid,success) {
      connection.query('Select * FROM SYKKEL WHERE sykkel_id=?',[sykkelid], (error, results) => {
        if (error) {
          varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
          return console.error(error);
        }
        success(results[0]);
      });
   }
   updateSykkelByID(status, avdeling, sykkelid) {
     console.log(status, avdeling, sykkelid);
     connection.query('UPDATE SYKKEL SET status_id=?, naa_avdeling_id=? WHERE sykkel_id=?',[status, avdeling, sykkelid], (error, results) => {
       if (error) {
         varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
         return console.error(error);
       }
         console.log(results);

     });
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
