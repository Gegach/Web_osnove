const fs = require("fs");

class Alati {
	static dohvatiSve(kategorija) {
		const sadrzaj = fs.readFileSync("resursi/podaci/alati.csv", "utf-8").trim();
		const redovi = sadrzaj.split("\n");

		const alati = redovi.map((red) => {
			const [naziv, opis, csvKategorija, url, godina] = red.split(";");

			return {
				naziv: naziv.trim(),
				opis: opis.trim(),
				kategorija: csvKategorija.trim(),
				url: url.trim(),
				godina: godina.trim(),
			};
		});

		if (!kategorija) {
			return alati;
		} else {
			return alati.filter(
				(a) => a.kategorija.toLowerCase() === kategorija.toLowerCase()
			);
		}
	}

	static dohvatiPoNazivu(nazivAlata) {
		const svi = this.dohvatiSve();
		const trazen = svi.find(
			(a) => a.naziv.toLowerCase() === nazivAlata.toLowerCase()
		);

		return trazen;
	}

	static ukloniPoNazivu(nazivAlata) {
		const sadrzaj = fs.readFileSync("resursi/podaci/alati.csv", "utf-8").trim();
		const redovi = sadrzaj.split("\n");

		const filtrirani = redovi.filter((red) => {
			const [naziv] = red.split(";");

			return naziv.trim() !== nazivAlata.trim();
		});

		fs.writeFileSync("resursi/podaci/alati.csv", filtrirani.join("\n"));
	}

	static dodajNovi(objekt) {
		const redak = [
			objekt.naziv,
			objekt.opis,
			objekt.kategorija,
			objekt.url,
			objekt.godina,
		].join(";");

		fs.appendFileSync("resursi/podaci/alati.csv", "\n" + redak);
	}

	static azurirajPostojeci(trenutniNaziv, noviObjekt) {
		const sadrzaj = fs.readFileSync("resursi/podaci/alati.csv", "utf-8").trim();
		const redoviStari = sadrzaj.split("\n");

		const redoviNovi = redoviStari.map((red) => {
			const [naziv] = red.split(";");

			if (naziv.trim().toLowerCase() === trenutniNaziv.trim().toLowerCase()) {
				return [
					noviObjekt.naziv,
					noviObjekt.opis,
					noviObjekt.kategorija,
					noviObjekt.url,
					noviObjekt.godina,
				].join(";");
			} else {
				return red;
			}
		});

		fs.writeFileSync("resursi/podaci/alati.csv", redoviNovi.join("\n"));
	}
}

module.exports = Alati;
