const cards = document.querySelectorAll(".card");
const modalContainer = document.querySelector(".modal-container");

for (let card of cards) {
  card.addEventListener("click", () => {
    modalContainer.classList.add("active");

    modalContainer.querySelector(
      "iframe"
    ).src = `https://blog.rocketseat.com.br/${card.id}`;
  });
}

modalContainer.querySelector("#close").addEventListener("click", () => {
  modalContainer.classList.remove("active");
  modalContainer.querySelector("iframe").src = "";
});

/**Implementation modal maximaze */
const modal = document.querySelector(".modal");
const maximaze = document.querySelector("#maximaze");

maximaze.addEventListener("click", () => {
  modal.classList.add("maximaze");
});

modal.querySelector("#minimaze").addEventListener("click", () => {
  if (modal.classList.contains("maximaze")) {
    modal.classList.remove("maximaze");
  }
});
