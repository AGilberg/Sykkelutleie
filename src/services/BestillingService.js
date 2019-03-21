import { connection } from '../mysql_connection';

class BestillingService {
  addOrder(cartArr, ansvarlig, status, leieStart, leieSlutt, beskrivelse) {
    //legg til en ny bestilling i databasen
    let sum = 0; //regn ut summen, ønskelig fordi priser kan endre seg
    let d = new Date();
    let dateStamp = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();

    connection.query(
      //legg inn bestilling
      'insert into BESTILLING values (?,?,?,?,?,?,?,?)',
      [null, ansvarlig, sum, dateStamp, status, leieStart, leieSlutt, beskrivelse],
      (error, results) => {
        if (error) return console.error(error);
        console.log(results); //FJERN
        success('Registrering vellykket');
      }
    );
    let count = 0;
    for (item of cartArr) {
      /*oppbygning: cartArr[item,item,...];
        item[utstyrId, sykkelId, antUtstyr, kommentar];
        */
      //trenger --> bestilling_id
      connection.query(
        //legg inn innholdet til bestillingen
        'insert into INNHOLD values (?,?,?,?,?,?)',
        [null, bestillingId, item[0], item[1], item[2], item[3]],
        (error, results) => {
          if (error) return console.error(error);
          count++;
          success();
        }
      );
    }
    if (count == cartArr.length) {
      // FIXME: SKRIV UT MELDINGEN TIL BRUKER?
      console.log('Alt ble reigstrert');
    } else {
      console.log('Mangler det noe?');
    }
  }

  alterOrder(orderArr) {
    //endre på en bestilling // FIXME: LAG
    //alter
  }

  removeOrder(orderId) {
    //fjern en bestilling
    //delete INNHOLD
    connection.query('delete from INNHOLD where bestilling_id = ?', [orderId], (error, results) => {
      if (error) return console.error(error);
      success();
    });
    //delete BESTILLING
    connection.query('delete from BESTILLING where bestilling_id = ?', [orderId], (error, results) => {
      if (error) return console.error(error);
      success();
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
  getOrderContents(bestilling_id, success) {
    connection.query(
      'select * from INNHOLD, SYKKEL, SYKKELTYPE, UTSTYR where INNHOLD.bestilling_id=? and INNHOLD.sykkel_id = SYKKEL.sykkel_id and SYKKEL.type_id = SYKKELTYPE.type_id and UTSTYR.utstyr_id = INNHOLD.utstyr_id',
      [bestilling_id],
      (error, results) => {
        if (error) return console.error(error);

        success(results);
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
