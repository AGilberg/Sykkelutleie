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
          varsel("FEIL!", "Du mangler input.", "vrsl-danger");
          return console.error(error);
        }

        success('Registrering vellykket');
        varsel("Suksess!", "Kunden ble registrert.", "vrsl-success");
      }
    );
  }

  removeKunde(kundeId, success){// FIXME: FUNKSJON IKKE TESTET I PROGRAMMET
    connection.query(
      'UPDATE `BESTILLING` SET `person_id` = NULL WHERE `person_id` = ?', [kundeId],
        (error, results) => {
        if(error) return console.error(error);

        connection.query(
          'DELETE FROM `GRUPPELEDER` WHERE `person_id` = ?',[kundeId],
          (error, results) => {
            if(error) return console.error(error);

            connection.query(
              'DELETE FROM `KUNDE` WHERE `person_id` = ?',[kundeId],
              (error, results) => {
                if(error) return console.error(error);

                connection.query(
                  'DELETE FROM `PERSON` WHERE `person_id` = ?',[kundeId],
                  (error, results) => {
                    if(error) return console.error(error);

                    success(results);
                  });
              });
          });
      });
  }

  getKunder(success) {
    connection.query('select * from PERSON', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }

  getKunde(metode, fornavn, etternavn, mobilnr, mail) {// FIXME: unødig etter adrians søkefunksjon?
    switch (metode) {
      case 'navn':
        connection.query(
          'select * from PERSON where fornavn like ? or etternavn like ?',
          [fornavn, etternavn],
          (error, results) => {
            if (error) return console.error(error);

            success(results);
          }
        );
        break;
      case 'mobilnr':
        connection.query('select * from PERSON where tlf = ?', [mobilnr], (error, results) => {
          if (error) return console.error(error);

          success(results);
        });
        break;
      case 'mail':
        connection.query('select * from PERSON where mail like ?', [mail], (error, results) => {
          if (error) return console.error(error);

          success(results);
        });
    }
  }
}

export let kundeService = new KundeService();
