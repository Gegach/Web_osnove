//////////////////
//ZA NAVIGACIJU//
////////////////
document.addEventListener("DOMContentLoaded", () => {
	const navigacija = document.querySelectorAll("nav a");
	const trenutna = window.location.pathname.replace(/\/$/, "").split("/").pop();

	navigacija.forEach((element) => {
		const link = element
			.getAttribute("href")
			.replace(/\/$/, "")
			.split("/")
			.pop();

		if (link === trenutna) {
			element.style.backgroundColor = "coral";
		}
	});
});
////////////////
//ZA LIGHTBOX//
//////////////
document.addEventListener("DOMContentLoaded", () => {
	const slike = document.querySelectorAll(".img-thumbnail");

	slike.forEach((slika) => {
		slika.addEventListener("click", function (e) {
			e.preventDefault();
			const src = this.src;

			const pokrivač = document.createElement("div");
			pokrivač.id = "lightbox-pokrivač";

			const img = document.createElement("img");
			img.src = src;
			img.alt = this.alt;

			const zatvori = document.createElement("span");
			zatvori.textContent = "×";
			zatvori.id = "lightbox-zatvori";

			pokrivač.appendChild(zatvori);
			pokrivač.appendChild(img);
			document.body.appendChild(pokrivač);

			zatvori.addEventListener("click", () =>
				document.body.removeChild(pokrivač)
			);
			pokrivač.addEventListener("click", (e) => {
				if (e.target === pokrivač) document.body.removeChild(pokrivač);
			});
		});
	});
});
//////////////
//ZA KLIZAČ//
////////////
document.addEventListener("DOMContentLoaded", () => {
	const slajdovi = document.querySelectorAll(".slajd");
	const strelice = document.querySelectorAll(".klizač-strelica");
	let trenutni = 0;

	function prikaziSlajd(index) {
		slajdovi.forEach((slajd, i) => {
			slajd.classList.toggle("trenutni", i === index);
		});
	}

	prikaziSlajd(trenutni);

	strelice.forEach((gumb) => {
		gumb.addEventListener("click", () => {
			const pomak = parseInt(gumb.dataset.pomak, 10);
			trenutni = (trenutni + pomak + slajdovi.length) % slajdovi.length;
			prikaziSlajd(trenutni);
		});
	});

	setInterval(() => {
		trenutni = (trenutni + 1) % slajdovi.length;
		prikaziSlajd(trenutni);
	}, 6000);
});
////////////////////////
//ZA STRANICU DETALJA//
//////////////////////
document.addEventListener("DOMContentLoaded", () => {
	const opisi = document.getElementsByClassName("alati-opis");

	Array.from(opisi).forEach((element) => {
		const cijeliTekst = element.dataset.cijeliTekst;
		const rijeci = cijeliTekst.split(" ");
		const prvihSest = rijeci.slice(0, 6).join(" ");
		const ostatak = rijeci.slice(6).join(" ");

		const spanPrvihSest = element.getElementsByClassName("prvih-sest")[0];
		const spanTocke = element.getElementsByClassName("tri-tocke")[0];

		spanPrvihSest.textContent = prvihSest;

		spanTocke.addEventListener("click", () => {
			spanPrvihSest.textContent = cijeliTekst;
			spanTocke.style.display = "none";
		});
	});
});
