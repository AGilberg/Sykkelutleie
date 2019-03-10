import { connection } from './mysql_connection';
/*
connection.query(
  //spørring
    (error, results) => {
    if(error) return console.error(error);

    success(results);
  });
*/
class LogService{
  constructor(){
    this.StaffId = null;
    this.logStatus = false;
  }

  logInUser(username, id, password){
    connection.query(
      'select password from ANSATT where fornavn like ? and id = ?', [username, id],
        (error, results) => {
        if(error) return console.error(error);
        let reply;
        if(password == results[0].passord){// FIXME: FINNES IKKE I DATABASE
          this.logStatus = true;
          this.StaffId = id;
          reply = "Du er nå logget inn";
        }else
          reply = "Feil brukerdata eller passord";
        success(reply);
      });
  }

  logOutUser(){
    this.logStatus = false;
  }
  checkLogStatus(){
    return this.logStatus;
  }
}

class BestillingService{
  addOrder(cartArr, ansvarlig, status, leieStart, leieSlutt, beskrivelse){//legg til en ny bestilling i databasen
    let sum = 0;//regn ut summen, ønskelig fordi priser kan endre seg
    let d = new Date();
    let dateStamp = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

    connection.query(//legg inn bestilling
      'insert into BESTILLING values (?,?,?,?,?,?,?,?)',
      [null, ansvarlig, sum, dateStamp, status, leieStart, leieSlutt, beskrivelse],
        (error, results) => {
        if(error) return console.error(error);
        console.log(results);//FJERN
        success("Registrering vellykket");
      });
      let count = 0;
      for(item of cartArr){
        /*oppbygning: cartArr[item,item,...];
        item[utstyrId, sykkelId, antUtstyr, kommentar];
        */
        //trenger --> bestilling_id
        connection.query(//legg inn innholdet til bestillingen
          'insert into INNHOLD values (?,?,?,?,?,?)',
          [null, bestillingId, item[0], item[1], item[2], item[3]],
            (error, results) => {
            if(error) return console.error(error);
            count++;
            success();
          });
      }
      if(count == cartArr.length){// FIXME: SKRIV UT MELDINGEN TIL BRUKER?
        console.log("Alt ble reigstrert");
      }else{
        console.log("Mangler det noe?");
      }
  }

  alterOrder(orderArr){//endre på en bestilling // FIXME: LAG
    //alter
  }

  removeOrder(orderId){//fjern en bestilling
    //delete INNHOLD
    connection.query(
      'delete from INNHOLD where bestilling_id = ?',[orderId],
        (error, results) => {
        if(error) return console.error(error);
        success();
      });
    //delete BESTILLING
    connection.query(
      'delete from BESTILLING where bestilling_id = ?',[orderId],
        (error, results) => {
        if(error) return console.error(error);
        success();
      });
  }

  updateStatus(orderId, status){//endre statusen til en bestilling
    connection.query(
      'update BESTILLING set status_id = ?, where bestilling_id = ?',[status, orderId],
        (error, results) => {
        if(error) return console.error(error);
        success();
      });
  }

  validateOrder(){//bekreft at orderen er komplett uten feil eller mangler
    /*
    det er en ansvarlig kunden
    sykkelen er ledig i gitt periode
    start og slutt dato er gyldige
    */

  }

  getOrder(){//søk etter en ordre
    //dato, ansvarlig
  }
  getAktiveBestillinger(success) {
    connection.query('select * from BESTILLING', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

class KundeService{
    addNewKunde(fornavn, etternavn, mail, tlf, adresse, postnr, sted, fodt, kommentar){//legg til en ny kunde
      connection.query(
      'insert into PERSON (person_id, fornavn, etternavn, mail, tlf, adresse, post_nr, sted, fodt, kommentar) values (?,?,?,?,?,?,?,?,?,?)',
      [null, fornavn, etternavn, mail, tlf, adresse, postnr, sted, fodt, kommentar],
      (error, results) => {
      if(error) return console.error(error);

      success("Registrering vellykket");
    });
    }//legg til ekstrainfo pga kunde?

    addKundeToOrder(){//legg til en kunde som ansvarlig for et kjøp

    }

    removeKundeFromOrder(){//fjern en kunde som ansvarlig for et kjøp

    }

    getKunde(metode,fornavn, etternavn, mobilnr, mail){
      switch (metode) {
        case "navn":
        connection.query(
          'select * from PERSON where fornavn like ? or etternavn like ?', [fornavn, etternavn],
            (error, results) => {
            if(error) return console.error(error);

            success(results);
          });
          break;
        case "mobilnr":
        connection.query(
          'select * from PERSON where tlf = ?',[mobilnr],
            (error, results) => {
            if(error) return console.error(error);

            success(results);
          });
          break;
        case "mail":
        connection.query(
          'select * from PERSON where mail like ?',[mail],
            (error, results) => {
            if(error) return console.error(error);

            success(results);
          });
      }
    }
}

class SykkelService{
  getSykkel(metode, navn, type){
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
}

class VareService{
  getVare(){//søk etter en vare

  }
}

class CartService{
  /*tableHome => hvor produktet hører hjemme, SYKKEL, UTSTYR, ...
  cart[0] = [tableHome, colum1, colum2, colum3, colum4, colum5, ...];
  switch (tableHome) {
    case "tableName":
      correctRefister(cart[0][1],cart[0][2],cart[0][3],cart[0][4],...);
      break;
    default:

  }
  */
  constructor(){
    this.cart = [];
  }
  removeCart(){
    cart = [];
  }
  alterCart(){

  }
  addItem(item){

  }
}

/*EXPORT DATA HERE*/
export let logService = new LogService();
export let bestillingService = new BestillingService();
export let kundeService = new KundeService();
export let sykkelService = new SykkelService();
export let vareService = new VareService();
export let cartService = new CartService();
