function generirajZaglavlje(title = "AI alati") {
	return `
  <!DOCTYPE html>
  <html lang="hr">
  <head>
    <meta charset="utf-8">
    <meta name="author" content="Dorijan Gegač">
    <meta name="description" content="Druga zadaća - dinamičke stranice">
    <meta name="keywords" content="AI, alati, umjetna inteligencija, web, zadaća">
    <meta name="date" content="2025-06-06">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/dizajn/dgegac23.css" type="text/css">
    <link rel="stylesheet" href="/dizajn/dgegac23Responzivnost.css" type="text/css">
    <script src="/JSklijent/dgegac23.js"></script>
  </head>
  <body>
    <header>
      <h1 class="moj-naslov">AI alati</h1>
      <a href="/index.html"><img src="/resursi/slike/AI-16-128.png" alt="Logo" height="75"></a>
    </header>
    <nav>
      <a href="/index.html">Početna</a>
      <a href="/dokumentacija.html">Dokumentacija</a>
      <a href="/oAutoru.html">O autoru</a>
      <a href="/anketa.html">Anketa</a>
      <a href="/projekti.html">Projekti</a>
      <a href="/alati">Alati</a>
    </nav>
    <main>
  `;
}

function generirajPodnozje() {
	return `
    </main>
    <footer>
      <div class="podnožje-lijevo">
        <p>&copy; 2025 Dorijan Gegač</p>
      </div>
      <div class="podnožje-desno">
        <a href="https://chat.openai.com" target="_blank">
          <img src="/resursi/slike/th.jpg" alt="ChatGPT" height="50" width="50">
        </a>
        <a href="https://www.deepseek.com" target="_blank">
          <img src="/resursi/slike/deepseek-logo.jpg" alt="Deepseek" height="50" width="50">
        </a>
        <a href="https://github.com/features/copilot" target="_blank">
          <img src="/resursi/slike/github-logo.jpg" alt="Github Copilot" height="50" width="50">
        </a>
        <a href="http://validator.w3.org/check?uri=https://spider.foi.hr/OWT/2025/zadaca_01/dgegac23/index.html" target="_blank">
          <img src="https://spider.foi.hr/OWT/materijali/slike/HTML5.png" alt="HTML5 - validator" height="50">
        </a>
      </div>
    </footer>
  </body>
  </html>
  `;
}

function generirajStranicuAlati(alati) {
	let sadrzaj = `
      <h2>Popis AI alata</h2>
      <form method="GET" action="/alati">
        <label for="kategorija">Filtriraj po kategoriji:</label>
        <input type="text" name="kategorija" id="kategorija">
        <button type="submit" class="gumb-detalji">Filtriraj</button>
      </form>
      <ul class="lista-alata">
    `;

	alati.forEach((alat, index) => {
		sadrzaj += `
        <li>
          <strong>${index + 1}. ${alat.naziv}</strong> (${alat.godina}) – ${
			alat.kategorija
		}
          <br>
          <a href="/alati/detalji?naziv=${encodeURIComponent(
						alat.naziv
					)}" class="gumb-detalji">Detalji</a>
          <form method="POST" action="/alati/ukloni" style="display:inline;">
            <input type="hidden" name="naziv" value="${alat.naziv}">
            <button type="submit" class="gumb-detalji">Ukloni</button>
          </form>
        </li>
      `;
	});

	sadrzaj += `</ul>`;
	return generirajZaglavlje("Popis AI alata") + sadrzaj + generirajPodnozje();
}

function generirajStranicuDetalji(alat) {
	let sadrzaj = "";

	if (!alat) {
		sadrzaj = `<p>Traženi AI alat nije pronađen!</p><a href="/alati">Natrag</a>`;
	} else {
		sadrzaj = `
        <h2>${alat.naziv}</h2>
        <p><strong>Opis:</strong> ${alat.opis}</p>
        <p><strong>Kategorija:</strong> ${alat.kategorija}</p>
        <p><strong>Godina:</strong> ${alat.godina}</p>
        <p><strong>URL:</strong> <a href="${alat.url}" target="_blank">${alat.url}</a></p>
        <a href="/alati" class="gumb-detalji">Povratak na listu</a>
      `;
	}

	return generirajZaglavlje("Detalji alata") + sadrzaj + generirajPodnozje();
}

module.exports = {
	generirajStranicuAlati,
	generirajStranicuDetalji,
};
