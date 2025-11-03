document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("obrazac");
	const ocjena = document.getElementById("ocjena");
	const prikaz = document.getElementById("ocjena-prikaz");

	ocjena.min = 1;
	ocjena.max = 5;
	ocjena.step = 1;

	ocjena.addEventListener("input", () => {
		prikaz.textContent = ocjena.value;
	});

	form.addEventListener("submit", (event) => {
		let ispravno = true;

		const ime = document.getElementById("ime");
		if (ime.value.trim() === "") {
			ispravno = false;
			oznaciGresku(ime, "Ime je obavezno.");
		} else {
			ukloniGresku(ime);
		}

		const prezime = document.getElementById("prezime");
		if (prezime.value.trim() === "") {
			ispravno = false;
			oznaciGresku(prezime, "Prezime je obavezno.");
		} else {
			ukloniGresku(prezime);
		}

		const tel = document.getElementById("broj-tel");
		if (tel.value.trim() === "") {
			ispravno = false;
			oznaciGresku(tel, "Broj telefona je obavezan.");
		} else {
			ukloniGresku(tel);
		}

		const email = document.getElementById("email");
		if (email.value.trim() === "") {
			ispravno = false;
			oznaciGresku(email, "Email je obavezan.");
		} else {
			ukloniGresku(email);
		}

		const godine = document.getElementById("godine");
		const brojRegex = /^\d+(\.\d{1,2})?$/;

		if (godine.value.trim() === "") {
			ispravno = false;
			oznaciGresku(godine, "Unesi broj godina.");
		} else if (!brojRegex.test(godine.value.trim())) {
			ispravno = false;
			oznaciGresku(
				godine,
				"Godine moraju biti broj (cijeli ili decimalni, točka, max 2 decimale)."
			);
		} else {
			ukloniGresku(godine);
		}

		const spol = document.querySelectorAll("input[name='spol']:checked");
		if (spol.length === 0) {
			ispravno = false;
			oznaciGresku(document.getElementById("musko"), "Odaberi spol.");
		} else {
			ukloniGresku(document.getElementById("musko"));
		}

		const alat = document.getElementById("alat");
		if (alat.value === "") {
			ispravno = false;
			oznaciGresku(alat, "Odaberi AI alat.");
		} else {
			ukloniGresku(alat);
		}

		const iskustvo = document.getElementById("iskustvo");
		const tekst = iskustvo.value.trim();
		const regexURL = /https?:\/\/[^\s]+\.(hr|com|org)/;
		const zabranjeni = /[$€]/;
		if (
			tekst.length < 200 ||
			tekst.length > 1000 ||
			!regexURL.test(tekst) ||
			zabranjeni.test(tekst)
		) {
			ispravno = false;
			oznaciGresku(
				iskustvo,
				"Iskustvo mora imati 200–1000 znakova, sadržavati URL (.hr/.com/.org), bez $ i €."
			);
		} else {
			ukloniGresku(iskustvo);
		}

		const datum = document.getElementById("datum");
		if (!datum.value) {
			ispravno = false;
			oznaciGresku(datum, "Unesi datum korištenja.");
		} else {
			ukloniGresku(datum);
		}

		const vrijeme = document.getElementById("vrijeme");
		if (!vrijeme.value) {
			ispravno = false;
			oznaciGresku(vrijeme, "Unesi vrijeme korištenja.");
		} else {
			ukloniGresku(vrijeme);
		}

		const ocjenaBroj = parseInt(ocjena.value, 10);
		if (isNaN(ocjenaBroj) || ocjenaBroj < 1 || ocjenaBroj > 5) {
			ispravno = false;
			oznaciGresku(ocjena, "Ocjena mora biti između 1 i 5.");
		} else {
			ukloniGresku(ocjena);
		}

		const lozinka = document.getElementById("lozinka");
		if (lozinka.value.trim().length < 6) {
			ispravno = false;
			oznaciGresku(lozinka, "Lozinka mora imati barem 6 znakova.");
		} else {
			ukloniGresku(lozinka);
		}

		if (!ispravno) {
			event.preventDefault();
		}
	});

	function oznaciGresku(elem, poruka) {
		elem.style.border = "2px solid red";
		const idPoruke = elem.id + "-poruka";
		let porukaElem = document.getElementById(idPoruke);

		if (!porukaElem) {
			porukaElem = document.createElement("div");
			porukaElem.id = idPoruke;
			porukaElem.style.color = "red";
			porukaElem.innerHTML = poruka;
			elem.parentNode.insertBefore(porukaElem, elem.nextSibling);
		} else {
			porukaElem.innerHTML = poruka;
		}
	}

	function ukloniGresku(elem) {
		elem.style.border = "";
		const idPoruke = elem.id + "-poruka";
		const porukaElem = document.getElementById(idPoruke);
		if (porukaElem) {
			porukaElem.remove();
		}
	}
});
