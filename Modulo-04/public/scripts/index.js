const currentPage = location.pathname;
const links = document.querySelectorAll('header .links a');

for (let link of links) {
  if (currentPage.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
}

const pages = [];
let pagesActual = 15,
  totalPages = 20;

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  const firstAndLastPages = currentPage === 1 || currentPage == totalPages;
  const afterPagesOfPageCurrent = currentPage <= pagesActual + 2;

  if (
    firstAndLastPages ||
    afterPagesOfPageCurrent ||
    currentPage >= pagesActual - 2
  ) {
    pages.push(currentPage);
  }
}
console.log(pages);
