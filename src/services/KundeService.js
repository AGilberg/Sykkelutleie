import { connection } from '../mysql_connection';
import varsel from '../services/notifications.js';

class KundeService {
  addNewKunde(fornavn, etternavn, mail, tlf, adresse, postnr, sted, fodt, kommentar, success) {
    //legg til en ny kunde
    connection.query(
      'insert into PERSON values (null, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [fornavn, etternavn, mail, tlf, adresse, postnr, sted, fodt, kommentar],
      (error, results) => {
        if (error) {
          varsel('FEIL!', 'Du mangler input.', 'vrsl-danger');
          return console.error(error);
        }

        success('Registrering vellykket');
        varsel('Suksess!', 'Kunden ble registrert.', 'vrsl-success');
      }
    );
  }

  removeKunde(person_id) {
    // Slette person

    connection.query('UPDATE BESTILLING SET person_id = NULL WHERE person_id = ?', [person_id], (error, results) => {
      if (error) return console.error(error);

      connection.query('DELETE FROM PERSON WHERE person_id = ?', [person_id], (error, results) => {
        if (error) return console.error(error);
      });
    });
  }

  getKunder(success) {
    connection.query('select * from PERSON', (error, results) => {
      if (error) {
        varsel('Oops!', 'Det oppsto problemer med å hente data.', 'vrsl-danger');
        return console.error(error);
      }

      success(results);
    });
  }
}

export let kundeService = new KundeService();
