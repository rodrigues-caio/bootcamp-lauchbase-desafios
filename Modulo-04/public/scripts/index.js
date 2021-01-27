const currentPage = location.pathname;
const links = document.querySelectorAll('header .links a');

for (let link of links) {
  if (currentPage.includes(link.getAttribute('href'))) {
    link.classList.add('active');
  }
}

function paginate(pagesActual, totalPages) {
  const pages = [];
  let oldPage;

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPages = currentPage === 1 || currentPage === totalPages;
    const afterPagesOfPageCurrent = currentPage <= pagesActual + 2;
    const beforePagesOfPageCurrent = currentPage >= pagesActual - 2;

    if (
      firstAndLastPages ||
      (afterPagesOfPageCurrent && beforePagesOfPageCurrent)
    ) {
      if (oldPage && currentPage - oldPage > 2) {
        pages.push('...');
      }

      if (oldPage && currentPage - oldPage == 2) {
        pages.push(oldPage + 1);
      }

      pages.push(currentPage);
      oldPage = currentPage;
    }
  }
  return pages;
}

function createPagination(pagination) {
  const page = +pagination.dataset.page;
  const total = +pagination.dataset.total;
  const filter = pagination.dataset.filter;

  const pages = paginate(page, total);
  console.log(pages);

  let elements = '';

  for (let page of pages) {
    if (String(page).includes('...')) {
      elements += `<span>${page}</span>`;
    } else {
      if (filter) {
        elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`;
      } else {
        elements += `<a href="?page=${page}">${page}</a>`;
      }
    }
  }

  pagination.innerHTML = elements;
}

const pagination = document.querySelector('.pagination');

if (pagination) {
  createPagination(pagination);
}
