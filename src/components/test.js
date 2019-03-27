sykkelService.getType(this.props.match.params.id, typer => {
  this.typer = typer;
  console.log(this.typer);
});

sykkelService.getAvdelingNavn(avdelinger => {
  this.avdelinger = avdelinger;
  console.log(this.avdelinger);
});

sykkelService.getSykkelklasser(klasse => {
  this.klasse = klasse;
  console.log(this.klasse);
});


getAvdelingNavn(navn, success) {
  connection.query('SELECT navn FROM AVDELING WHERE navn=?', [navn], (error, results) => {
    if (error) return console.error(error);
    console.log(results);
    success(results);
  });
}
getType(type_id, typenavn, hjulstorrelse, rammestorrelse, girsystem, klasse_id, pris, success) {
  connection.query(
    'select type_id, typenavn, hjulstorrelse, rammestorrelse, girsystem, klasse_id, pris FROM SYKKELTYPE WHERE type_id=?',
    [type_id, typenavn, hjulstorrelse, rammestorrelse, girsystem, klasse_id, pris],
    (error, results) => {
      if (error) return console.error(error);
      console.log(results)
      success(results);
    }
  );
}

getSykkelklasser(klasse_id, klassenavn, info, success) {
  connection.query(
    'SELECT klasse_id, klassenavn, info FROM KLASSE WHERE klasse_id=?',
    [klasse_id, klassenavn, info],
    (error, results) => {
      if (error) return console.error(error);

      success(results);
    }
  );
}
