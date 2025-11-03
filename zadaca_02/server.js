const express = require("/usr/lib/node_modules/express");
const fs = require("fs");
const os = require("os");

function dajPort(korime) {
	const HOST = os.hostname();
	let port = null;
	if (HOST !== "spider.foi.hr") {
		port = 12222;
	} else {
		const portovi = require("/var/www/OWT/2024/portovi.js");
		port = portovi[korime];
	}
	return port;
}

const port = dajPort("dgegac23");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/JSklijent", express.static(__dirname + "/js/klijent"));
app.use("/dizajn", express.static(__dirname + "/css"));
app.use("/resursi", express.static(__dirname + "/resursi"));
app.use("/", express.static(__dirname + "/html"));
app.use("/", express.static(__dirname + "/html/detalji-proizvoljne"));

app.listen(port, () => {
	console.log(`Server pokrenut na http://localhost:${port}`);
});

const Alati = require("./js/server/dgegac23_alatiModul");
const Html = require("./js/server/dgegac23_generiranjeHTML");

app.get("/alati", (zah, odg) => {
	const kategorija = zah.query.kategorija || "";
	const alati = Alati.dohvatiSve(kategorija);
	odg.send(Html.generirajStranicuAlati(alati));
});

app.get("/alati/detalji", (zah, odg) => {
	const alat = Alati.dohvatiPoNazivu(zah.query.naziv);
	odg.send(Html.generirajStranicuDetalji(alat));
});

app.post("/alati/ukloni", (zah, odg) => {
	const naziv = zah.body.naziv;

	Alati.ukloniPoNazivu(naziv);

	odg.redirect("/alati");
});
////////////////
// api/alati //
//////////////
app.get("/api/alati", (zah, odg) => {
	const kategorija = zah.query.kategorija || "";
	const uredenaLista = Alati.dohvatiSve(kategorija);
	odg.status(200).json(uredenaLista);
});

app.post("/api/alati", (zah, odg) => {
	const { naziv, opis, kategorija, url, godina } = zah.body;

	if (!naziv || !opis || !kategorija || !url || !godina) {
		return odg.status(400).json({
			greska: "Neispravni ili nepotpuni podaci za alat.",
		});
	}

	const novi = { naziv, opis, kategorija, url, godina };
	Alati.dodajNovi(novi);
	odg.status(201).json(novi);
});

app.put("/api/alati", (zah, odg) => {
	odg.status(405).json({
		greska: "Metoda nije dopuštena za popis alata.",
	});
});

app.delete("/api/alati", (zah, odg) => {
	odg.status(405).json({
		greska: "Metoda nije dopuštena za popis alata.",
	});
});

//////////////////////////
// api/alati/{detalji} //
////////////////////////
app.get("/api/alati/:naziv", (zah, odg) => {
	const alat = Alati.dohvatiPoNazivu(zah.params.naziv);
	if (alat) {
		odg.status(200).json(alat);
	} else {
		odg
			.status(404)
			.json({ error: "AI alat s traženim nazivom nije pronađen." });
	}
});

app.post("/api/alati/:naziv", (zah, odg) => {
	odg.status(405).json({
		greska: "Metoda nije dopuštena za specifični alat.",
	});
});

app.put("/api/alati/:naziv", (zah, odg) => {
	const alat = Alati.dohvatiPoNazivu(zah.params.naziv);
	if (alat) {
		const { naziv, opis, kategorija, url, godina } = zah.body;

		if (!naziv || !opis || !kategorija || !url || !godina) {
			return odg.status(400).json({
				greska: "Neispravni podaci za ažuriranje.",
			});
		}

		const novi = { naziv, opis, kategorija, url, godina };
		Alati.azurirajPostojeci(zah.params.naziv, novi);
		odg.status(201).json(novi);
	} else {
		odg
			.status(404)
			.json({ error: "AI alat s traženim nazivom nije pronađen." });
	}
});

app.delete("/api/alati/:naziv", (zah, odg) => {
	const alat = Alati.dohvatiPoNazivu(zah.params.naziv);
	if (alat) {
		Alati.ukloniPoNazivu(zah.params.naziv);
		odg.status(204);
	} else {
		odg.status(404).json({
			greska: "AI alat s traženim nazivom nije pronađen za brisanje.",
		});
	}
});
////////////////////

app.get("/", (zah, odg) => {
	odg.redirect("/index.html");
});

app.use((zah, odg) => {
	odg.status(404).send(`
        <h1>Stranica ne postoji!</h1>
        <a href="/">Vrati se na početnu</a>
    `);
});
