import { connection } from '../mysql_connection';
import { cartService } from './CartService';
import varsel from './notifications.js';
import { history } from '../index.js';

class BestillingService {
  // FIXME: legg til boolsk rabatt --> if rabatt --> reduser sum med 5%
  addOrder(sum, rabatt) {
    //legg til en ny bestilling i databasen
    console.log(sum);
    console.log(rabatt);

    let d = new Date();
    let dateStamp = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

    let besk = cartService.getBeskrivelse(); // FIXME: gjør det mulig å legge inn en kommentar
    let start = cartService.getStartdato();
    let slutt = cartService.getSluttdato();
    let gruppe = cartService.getGruppe().gruppe_id; // FIXME: gjør det mulig å legge inn en gruppe(?)
    let kunde = cartService.getKunde().person_id;
    let status = cartService.getStatus().status_id; // FIXME: gjør det mulig å legge inn en status
    let varer = cartService.getHandlekurv();

    connection.query(
      //legg inn bestilling
      'INSERT INTO BESTILLING (bestilling_id, bestillingsdato, person_id, gruppe_id, leie_start, leie_slutt, status_id, sum, beskrivelse, gittRabatt) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [null, dateStamp, kunde, gruppe, start, slutt, status, sum, besk, rabatt],
      (error, results) => {
        if (error) return console.error(error);
        cartService.dropOrder();
        varsel('Suksess!', 'Bestillingen er registrert', 'vrsl-success');
        history.push('/');
        console.log('OK fra bestilling.js');
        console.log(results.insertId);
        let best_id = results.insertId;
        for(let i = 0; i < varer.length; i++){
          let vare = varer[i];
          switch (vare.kategori) {
            case "sykkel"://trenger bestillng_id og sykkel_id // FIXME: registrerer kun sykkelid 16
              connection.query(
                'insert into INNHOLDSYKKEL (innholdsykkel_id, bestilling_id, sykkel_id) values (?,?,?)',
                [null, best_id, 16 ], (error, results) => {
                if (error) return console.error(error);
                console.log(results);
              });
              break;
            case "utstyr":
            connection.query(
              'insert into INNHOLDUTSTYR (innholdutstyr_id, bestilling_id, utstyr_id, ant_utstyr) values (?,?,?,?)',
              [null, best_id, vare.id, vare.antall], (error, results) => {
              if (error) return console.error(error);
              console.log(results);
            });
              break;
            default:
              console.log("feil innhold i BestillingServive.js");
          }
        }
      }
    );
  }

  updateOrder(bestill, utstyr, sykkel, id) {
    connection.query(
      'update BESTILLING set sum=?, status_id=?, beskrivelse=?, leie_start=?, leie_slutt=? where bestilling_id=?',
      [
        bestill.sum,
        bestill.status_id,
        bestill.beskrivelse,
        bestill.leie_start,
        bestill.leie_slutt,
        bestill.bestilling_id
      ],
      (error, results) => {
        if (error) return console.error(error);
        connection.query(
          'update PERSON set fornavn=?, etternavn=? where person_id=?',
          [bestill.fornavn, bestill.etternavn, bestill.person_id],
          (error, results) => {
            if (error) return console.error(error);
          }
        );
      }
    );
  }

  deleteOrder(id) {
    //fjern en bestilling
    connection.query('delete from INNHOLDUTSTYR where bestilling_id = ?', [id], (error, results) => {
      if (error) return console.error(error);
      connection.query('delete from INNHOLDSYKKEL where bestilling_id = ?', [id], (error, results) => {
        if (error) return console.error(error);
        connection.query('delete from BESTILLING where bestilling_id = ?', [id], (error, results) => {
          if (error) return console.error(error);
        });
      });
    });
  }

  deleteSykkel(innholdsykkel_id) {
    connection.query('delete from INNHOLDSYKKEL WHERE innholdsykkel_id = ?', [innholdsykkel_id], (error, results) => {
      if (error) return console.error(error);
      console.log(results);
    });
  }

  deleteUtstyr(innholdutstyr_id) {
    connection.query('delete from INNHOLDUTSTYR WHERE innholdutstyr_id = ?', [innholdutstyr_id], (error, results) => {
      if (error) return console.error(error);
      console.log(results);
    });
  }

  tilstander(success) {
    //endre statusen til en bestilling
    connection.query('SELECT status_id, tilstand FROM STATUS', (error, results) => {
      if (error) return console.error(error);
      success(results);
    });
  }

  validateOrder() {
    //bekreft at orderen er komplett uten feil eller mangler
    /*
    det er en ansvarlig kunden
    sykkelen er ledig i gitt periode
    start og slutt dato er gyldige
    */
  }

  getOrder(bestilling_id, success) {
    connection.query(
      'select * from BESTILLING, PERSON, STATUS where bestilling_id=? and BESTILLING.person_id=PERSON.person_id and STATUS.status_id = BESTILLING.status_id',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results[0]);
      }
    );
  }

  getOrderContentsSykler(bestilling_id, success) {
    connection.query(
      'select * from INNHOLDSYKKEL, SYKKEL, SYKKELTYPE where INNHOLDSYKKEL.bestilling_id=? and INNHOLDSYKKEL.sykkel_id = SYKKEL.sykkel_id and SYKKEL.type_id = SYKKELTYPE.type_id',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
        console.log(results);
      }
    );
  }

  getOrderContentsUtstyr(bestilling_id, success) {
    connection.query(
      'select * from INNHOLDUTSTYR, UTSTYR where INNHOLDUTSTYR.bestilling_id=? and UTSTYR.utstyr_id = INNHOLDUTSTYR.utstyr_id',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
        console.log(results);
      }
    );
  }

  getAktiveBestillinger(success) {
    connection.query(
      'select * from BESTILLING, PERSON where BESTILLING.person_id = PERSON.person_id',
      (error, results) => {
        if (error) return console.error(error);

        success(results);
      }
    );
  }
}

export let bestillingService = new BestillingService();
