

sykkelService.getAvdelingNavn(avdelinger => {
  this.avdelinger = avdelinger;
  console.log(this.avdelinger);
});




getAvdelingNavn(navn, success) {
  connection.query('SELECT navn FROM AVDELING WHERE navn=?', [navn], (error, results) => {
    if (error) return console.error(error);
    console.log(results);
    success(results);
  });
}


<div className="input_div">
  <input type="text" size="25" value="1" id="count" style={{ marginRight: '20px' }} />
  <Button.Info value="-" onclick={this.antall}>
    -
  </Button.Info>
  <Button.Info value="+" onclick={this.antall}>
    +
  </Button.Info>
</div>
