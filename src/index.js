// hello world
console.log("Hello TL!");


const radioCards = document.querySelector(".radio-cards");
const bttnPower = document.getElementById("bttn-power");
const radioPlayer = document.getElementById("radio-player");
const currentlyPlayingLabel = document.querySelector(
  ".currently-playing-label"
);
const selectedRadio = document.querySelector(".selected-radio");

// insert radio cards
const buildCard = radio => {
  return `
    <div class="radio-card">
      <div class="card-top flex justify-space-between">
        <p class="radio-title card-text">${radio.name}</p>
        <p class="radio-fq card-text">${radio.frequency}</p>
      </div>
      <div class="card-extend flex justify-space-between hidden">
        <svg class="svg-width" style="enable-background:new 0 0 15 15;" version="1.1" viewBox="0 0 15 15" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path style="fill: #a3a7be;" d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><rect style="fill: #a3a7be;" height="1" width="8" x="3.5" y="7"/></svg>
        <img class="radio-avatar" src="${radio.image}">
        <svg class="svg-width" style="enable-background:new 0 0 15 15;" version="1.1" viewBox="0 0 15 15" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path style="fill: #a3a7be;" d="M7.5,0C3.364,0,0,3.364,0,7.5S3.364,15,7.5,15S15,11.636,15,7.5S11.636,0,7.5,0z M7.5,14C3.916,14,1,11.084,1,7.5  S3.916,1,7.5,1S14,3.916,14,7.5S11.084,14,7.5,14z"/><polygon style="fill: #a3a7be;" points="8,3.5 7,3.5 7,7 3.5,7 3.5,8 7,8 7,11.5 8,11.5 8,8 11.5,8 11.5,7 8,7 "/></svg>
      </div>
    </div>
    <hr>
  `;
};
const injectCard = radioCard => {
  radioCards.innerHTML += radioCard;
};

// remove last horizontal ruler
const removeLastRuler = () => {
  const lastRuler = document.querySelector("hr:last-child");
  lastRuler.parentElement.removeChild(lastRuler);
};

// RADIO CARDS CLICK LOGIC
const applyCardListeners = () => {
  const cards = document.querySelectorAll(".radio-card");
  const cardExtensions = document.querySelectorAll(".card-extend");

  const closeAllCards = () => {
    cardExtensions.forEach(cardExtension => {
      cardExtension.classList.add("hidden");
    });
  };

  cards.forEach(card => {
    card.children[0].addEventListener("click", e => {
      // radio is already selected -> close clicked radio
      if (
        e.currentTarget.innerText.split("\n")[0] === selectedRadio.innerText
      ) {
        currentlyPlayingLabel.classList.add("hidden");
        selectedRadio.classList.add("hidden");
        selectedRadio.innerText = "";
        // another radio or no radio selected -> open clicked radio
      } else {
        currentlyPlayingLabel.classList.remove("hidden");
        selectedRadio.classList.remove("hidden");
        selectedRadio.innerText = card.children[0].children[0].innerText;
        closeAllCards();
      }
      card.children[1].classList.toggle("hidden");
    });
  });
};


//TL API
fetch("https://teclead.de/recruiting/radios")
.then(resp => resp.json())
.then(data => {
  data.radios.forEach((radio) => {
    injectCard(buildCard(radio));
  });
  removeLastRuler();
  applyCardListeners();
})

