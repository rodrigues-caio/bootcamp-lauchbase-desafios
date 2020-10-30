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

modalContainer.querySelector("a").addEventListener("click", () => {
  modalContainer.classList.remove("active");
  modalContainer.querySelector("iframe").src = "";
});
