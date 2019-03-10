import { connection } from './mysql_connection';

class BestillingService {
  getAktiveBestillinger(success) {
    connection.query('select * from BESTILLING', (error, results) => {
      if (error) return console.error(error);

      success(results);
    });
  }
}

export let bestillingService = new BestillingService();
