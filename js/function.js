/*const cartas = prompt("Escolha um número de cartas entre 4 e 14");*/
const cartas = document.querySelectorAll(".card");

let cartaUm;
let cartaDois;
let cartaVirou = false; // checa se uma carta está virada
let desabilitarJogada = false; // desabilita jogada para prevenir que o
// jogador abra + de 2 cartas durante 1 turno

function virarCarta() {
  if (desabilitarJogada) return;
  if (this === cartaUm) return;

  this.classList.add("flip");

  if (!cartaVirou) {
    cartaVirou = true;
    cartaUm = this;

    return;
  }

  cartaDois = this;
  checarSeSaoIguais();
}

function checarSeSaoIguais() {
  let saoIguais = cartaUm.dataset.parrot === cartaDois.dataset.parrot;
  saoIguais ? desabilitarCartas() : desvirarCartas();
}

function desvirarCartas() {
  desabilitarJogada = true;
  setTimeout(() => {
    cartaUm.classList.remove("flip");
    cartaDois.classList.remove("flip");
    resetarVars();
  }, 1000);
}

function resetarVars() {
  cartaVirou = false;
  desabilitarJogada = false;
  cartaUm = null;
  cartaDois = null;
}

(function shuffle() {
  cartas.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

cartas.forEach((card) => card.addEventListener("click", virarCarta));
