export default function varsel(tittel, melding) {
  var closed = 'false';
  const body = document.getElementsByTagName('body')[0];
  const container = document.createElement('div');
  container.className = 'vrsl-container';
  body.appendChild(container);

  const vrsl = document.createElement('div');
  vrsl.className = 'vrsl';
  container.appendChild(vrsl);

  const ttl = document.createElement('div');
  ttl.className = 'vrsl-tittel';
  ttl.innerText = tittel;
  vrsl.appendChild(ttl);
  const mld = document.createElement('div');
  mld.className = 'vrsl-melding';
  mld.innerText = melding;
  vrsl.appendChild(mld);

  // Fjerner varselet
  setTimeout(() => {
    if (closed == 'false') {
      body.removeChild(container);
    }
  	}, 5000);

  container.onclick = function(){
    body.removeChild(container);
    closed = 'true';
  };
}
