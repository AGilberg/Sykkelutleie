import { connection } from '../mysql_connection';

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



export let logService = new LogService();
