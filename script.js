//objet contenant les faces du dé
const face_de = {
  1: "/image/de1.png",
  2: "/image/de2.png",
  3: "/image/de3.png",
  4: "/image/de4.png",
  5: "/image/de5.png",
  6: "/image/de6.png",
};
//tableau contenant valeur de chaque face
const valeurDe = Object.keys(face_de);

//ciblage des éléments
const de = document.getElementById("de");
const game = document.getElementById("game");
const nouvelle_partie = document.querySelector(".nouvelle_partie img");
const formulaire = document.querySelector(".formulaire");
const btn_formulaire = document.querySelector(".lancerLaPartie");
const lancer_de = document.querySelectorAll(".lancer_de");
const form_player1 = document.getElementById("form_player1");
const form_player2 = document.getElementById("form_player2");
const name_player = document.querySelectorAll(".name_player");
const hold = document.querySelector(".hold");
const actif_p1 = document.querySelector(".actif_p1");
const actif_p2 = document.querySelector(".actif_p2");
const shadow = document.querySelector("#de img");
const score_player = document.querySelectorAll(".score_player");
const scoreHold = document.querySelectorAll(".scoreHold");
const victoire = document.getElementById("victoire");
const revanche = document.querySelector(".revanche");
const nouvellePartie = document.querySelector(".nouvellePartie");
const winner = document.querySelector(".winner");

//fonction qui nous permet de générer aléatoirement un chiffre en 0 et 6
function alea() {
  const aleatoire = Math.trunc(Math.random() * 6) + 1;
  return aleatoire;
}
//fonction qui permet d'afficher les faces du dé
function lancerDe(face) {
  let card = document.createElement("img");
  card.src = face_de[face];
  card.dataset.value = valeurDe[face - 1];
  card.classList.add("shadow");
  de.appendChild(card);
}
//fonction reset du score
function resetScore() {
  score_player[0].innerHTML = 0;
  score_player[1].innerHTML = 0;
  scoreHold[0].innerHTML = 0;
  scoreHold[1].innerHTML = 0;
}
//fonction reset du voyant joueur actif
function resetActif() {
  if ((actif_p2.style.display = "block")) {
    actif_p2.style.display = "none";
    actif_p1.style.display = "block";
  }
}

//event qui fait apparaitre la div class="formulaire" pour les noms des joueurs
nouvelle_partie.addEventListener("click", () => {
  formulaire.style.display = "block";
  form_player1.value = "";
  form_player2.value = "";
});

//event qui lance une revanche entre les 2 joueurs et inverse leur noms
revanche.addEventListener("click", () => {
  victoire.style.display = "none";
  resetScore();
  resetActif();
  let player = "";
  player = name_player[0].innerHTML;
  name_player[0].innerHTML = name_player[1].innerHTML;
  name_player[1].innerHTML = player;
  game.style.pointerEvents = "auto";
});

//event lancer une nouvelle partie après la victoire
nouvellePartie.addEventListener("click", () => {
  victoire.style.display = "none";
  formulaire.style.display = "block";
});

//event qui met à jour le nom des joueurs et lance la partie
btn_formulaire.addEventListener("click", () => {
  if (form_player1.value == "" || form_player2.value == "") {
    name_player[0].innerHTML = "Player 1";
    name_player[1].innerHTML = "Player 2";
  } else {
    name_player[0].innerHTML = form_player1.value;
    name_player[1].innerHTML = form_player2.value;
  }
  formulaire.style.display = "none";
  actif_p1.style.display = "block";
  game.style.pointerEvents = "auto";
  resetScore();
  resetActif();
  console.log(name_player[0].innerHTML);
});

// fonction score
function scoring(joueur, valeur_du_de) {
  score_player[joueur].innerHTML =
    Number(score_player[joueur].innerHTML) + Number(valeur_du_de);
}

//fonction changement de joueur
function changementDeJoueur() {
  if (actif_p1.style.display !== "block") {
    actif_p1.style.display = "block";
    actif_p2.style.display = "none";
  } else {
    actif_p1.style.display = "none";
    actif_p2.style.display = "block";
  }
}
//function si le dé tombe sur 1
function de1(de, joueur) {
  if (de == 1) {
    changementDeJoueur();
    return (score_player[joueur].innerHTML = 0);
  }
}
//function hold
function holding(joueur) {
  changementDeJoueur();
  scoreHold[joueur].innerHTML =
    Number(score_player[joueur].innerHTML) +
    Number(scoreHold[joueur].innerHTML);
  if (parseInt(scoreHold[joueur].innerHTML) >= 100) {
    victoire.style.display = "block";
    winner.innerHTML = `VICTOIRE!! félicitaion ${name_player[joueur].innerHTML} vous avez gagné`;
    game.style.pointerEvents = "none";
    return (scoreHold[joueur].innerHTML = 0);
  } else {
    return (score_player[joueur].innerHTML = 0);
  }
}

//lancer de dé
for (let lancer of lancer_de) {
  lancer.addEventListener("click", () => {
    de.children[0].remove();
    lancerDe(alea());
    //on récupère la valeur du data de l'image qui correspond à la valeur de la face du dé
    let valeurDuDe = de.firstElementChild.dataset.value;
    if (actif_p1.style.display === "block") {
      //fonction pour attribuer le score au joueur1
      scoring(0, valeurDuDe);
      //fonction si le dé fait 1
      de1(valeurDuDe, 0);
      //event quand le joueur clic sur hold
    } else {
      scoring(1, valeurDuDe);
      //focntion si le dé fait 1
      de1(valeurDuDe, 1);
      //event quand le joueur clic sur hold
    }
  });
}

//event pour mettre le score dans le current du joueur lors du clic sur hold et change de joueur
hold.addEventListener("click", () => {
  if (actif_p1.style.display === "block") {
    holding(0);
  } else {
    holding(1);
  }
});
