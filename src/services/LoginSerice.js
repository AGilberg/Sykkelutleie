import { connection } from '../mysql_connection';
import varsel from './notifications.js';

class LoginService {
  loginUser(name, psw){
    connection.query(
      'select p.fornavn, p.etternavn, p.avdeling from PERSON p, ANSATT a where p.person_id = a.person_id AND a.brukernavn LIKE ? AND a.passord LIKE ?',
      [name,psw],
      (error, results) => {
        if (error) {
          varsel("FEIL!", "Skriv inn brukernavn og passord", "vrsl-danger");
          return console.error(error);
        }
        console.log("---LoginService------");
        console.log(results);
        if(results.length <= 0){
            varsel("FEIL!", "Feil brukernavn eller passord", "vrsl-danger");
            return;
        }
        varsel("Suksess!", "Du er nå logget inn", "vrsl-success");
      }
    );
  }
}

export default LoginService;
