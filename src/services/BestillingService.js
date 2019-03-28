import { connection } from '../mysql_connection';
import { cartService } from './CartService';

class BestillingService {// FIXME: legg til boolsk rabatt --> if rabatt --> reduser sum med 5%
  addOrder(sum, rabatt) {//legg til en ny bestilling i databasen
    console.log(sum);
    console.log(rabatt);

    let d = new Date();
    let dateStamp = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

    let besk = cartService.getBeskrivelse();// FIXME: gjør det mulig å legge inn en kommentar
    let start = cartService.getStartdato();
    let slutt = cartService.getSluttdato();
    let gruppe = cartService.getGruppe().gruppe_id;// FIXME: gjør det mulig å legge inn en gruppe(?)
    let kunde = cartService.getKunde().person_id;
    let status = cartService.getStatus().status_id;// FIXME: gjør det mulig å legge inn en status

    connection.query(//legg inn bestilling
      'INSERT INTO BESTILLING (bestilling_id, bestillingsdato, person_id, gruppe_id, leie_start, leie_slutt, status_id, sum, beskrivelse, gittRabatt) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [null, dateStamp, kunde, gruppe, start, slutt, status, sum, besk, rabatt],
      (error, results) => {
        if (error) return console.error(error);
        console.log("OK fra bestilling.js");
        console.log(results.insertId);
      }
    );

    /*


    switch (varer[i].kategori) {
      case "sykkel":
        sum
        break;
      case "utstyr":

        break;
      default:
        console.log("feil med summering i BestillingServive.js");

    }



    DATOFORMAT: YYYY-DD-MM

    */
    // let count = 0;// FIXME: legg til registrering av innhold
    // for (item of cartArr) {
    //   /*oppbygning: cartArr[item,item,...];
    //     item[utstyrId, sykkelId, antUtstyr, kommentar];
    //     */
    //   //trenger --> bestilling_id
    //   connection.query(
    //     //legg inn innholdet til bestillingen
    //     'insert into INNHOLD values (?,?,?,?,?,?)',
    //     [null, bestillingId, item[0], item[1], item[2], item[3]],
    //     (error, results) => {
    //       if (error) return console.error(error);
    //       count++;
    //       success();
    //     }
    //   );
    // }
    // if (count == cartArr.length) {
    //   // FIXME: SKRIV UT MELDINGEN TIL BRUKER?
    //   console.log('Alt ble reigstrert');
    // } else {
    //   console.log('Mangler det noe?');
    // }
  }

  updateOrder(bestill, utstyr, sykkel, id) {
    connection.query(
      'update BESTILLING set sum=?, tilstand=?, beskrivelse=?, leie_start=?, leie_slutt=? where bestilling_id=?',
      [
        bestill.sum,
        bestill.tilstand,
        bestill.beskrivelse,
        bestill.leie_start,
        bestill.leie_slutt,
        bestill.bestilling_id
      ],
      (error, results) => {
        if (error) return console.error(error);
        connection.query(
          'update INNHOLDUTSTYR set navn=?, ant_utstyr=? where bestilling_id=?',
          [utstyr.navn, utstyr.ant_utstyr],
          (error, results) => {
            if (error) return console.error(error);
            connection.query(
              'update INNHOLDSYKKEL set typenavn=? where bestilling_id=?',
              [sykkel.typenavn],
              (error, results) => {
                if (error) return console.error(error);
                connection.query(
                  'update PERSON set fornavn=?, etternavn=? where bestilling_id=?',
                  [bestill.fornavn, bestill.etternavn],
                  (error, results) => {
                    if (error) return console.error(error);
                    connection.query(
                      'update STATUS set tilstand=? where bestilling_id=?',
                      [bestill.tilstand],
                      (error, results) => {
                        if (error) return console.error(error);
                      }
                    );
                  }
                );
              }
            );
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

  updateStatus(orderId, status) {
    //endre statusen til en bestilling
    connection.query(
      'update BESTILLING set status_id = ?, where bestilling_id = ?',
      [status, orderId],
      (error, results) => {
        if (error) return console.error(error);
        success();
      }
    );
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
    connection.query('select * from BESTILLING', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingService = new BestillingService();
